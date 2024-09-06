const Faltas = require('../models/faltas');
const EstadoFaltas = require('../models/estado_faltas.js'); // Supondo que exista um model para estado_horas
const Estado = require('../models/estado'); // Supondo que exista um model para estado
const Utilizador = require ('../models/utilizadores.js')
const admin = require('../firebase.js'); // Importa o Firebase admin

// Listar todas as faltas
exports.listarTodos = async (req, res) => {
    try {
        const faltas = await Faltas.findAll();
        res.json(faltas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar uma falta por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const falta = await Faltas.findByPk(id_falta);
        if (falta) {
            res.json(falta);
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//justificacao
// Criar nova falta
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { data, id_user } = req.body;

        // Se houver um arquivo PDF carregado, gerar o caminho correto
        const justificacao = req.file ? `/${req.file.filename}` : ''; // Caminho do arquivo PDF


        // Criar o registro de falta na base de dados
        const novaFalta = await Faltas.create({
            data,
            justificacao,
            id_user
        });

        // Criar o registro na tabela estado_faltas com id_estado 3
        await EstadoFaltas.create({
            id_falta: novaFalta.id_falta, // O id do registro de faltas recém-criado
            id_estado: 3 // O id do estado que você deseja definir
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(novaFalta);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar falta:', error);

        // Responder com status 500 e a mensagem de erro
        res.status(500).json({ error: error.message });
    }
};


// Atualizar uma falta por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_falta } = req.params;

        if (req.file) {
            updateData.justificacao = req.file.path;
        }

        const [updated] = await Faltas.update(req.body, {
            where: { id_falta }
        });
        if (updated) {
            const updatedFalta = await Faltas.findByPk(id_falta);
            res.json(updatedFalta);
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar uma falta por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const deleted = await Faltas.destroy({
            where: { id_falta }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Listar todas as faltas pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das faltas com estado pendente
        const faltasPendentesIds = await EstadoFaltas.findAll({
            where: { id_estado: 3 }, // Estado pendente
            attributes: ['id_falta'] // Retornamos apenas os IDs das faltas pendentes
        });

        // Se não houver faltas pendentes, retornamos uma lista vazia
        if (faltasPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das faltas pendentes
        const ids = faltasPendentesIds.map(item => item.id_falta);

        // Encontramos as faltas com os IDs filtrados
        const faltasPendentes = await Faltas.findAll({
            where: { id_falta: ids },
            include: [
                {
                    model: Utilizador,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as faltas pendentes
        res.json(faltasPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das faltas por ID
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const { id_estado, fcmToken } = req.body; // fcmToken vem da app Flutter

        // Atualizar o estado_faltas com o novo id_estado
        const [updated] = await EstadoFaltas.update(
            { id_estado },
            { where: { id_falta } }
        );

        if (updated) {
            // Enviar notificação push se a atualização foi bem-sucedida
            const message = {
                notification: {
                    title: 'Estado de Falta Atualizado',
                    body: `O estado da falta ${id_falta} foi atualizado para ${id_estado}`,
                },
                token: fcmToken, // Token do dispositivo que irá receber a notificação
            };

            admin.messaging().send(message)
                .then((response) => {
                    console.log('Notificação enviada com sucesso:', response);
                })
                .catch((error) => {
                    console.log('Erro ao enviar notificação:', error);
                });

            res.json({ message: 'Estado atualizado e notificação enviada com sucesso' });
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};