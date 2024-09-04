// controllers/feriasController.js
const Ferias = require('../models/ferias');
const EstadoFerias = require('../models/estado_ferias');
const Estado = require('../models/estado');
const Utilizador = require('../models/utilizadores')
const admin = require('../firebase.js'); // Importa o Firebase admin

// Listar todas as férias com o estado correspondente
exports.listarTodos = async (req, res) => {
    try {
        const ferias = await Ferias.findAll({
            include: [
                {
                    model: EstadoFerias,
                    include: [
                        {
                            model: Estado,
                            attributes: ['id_estado', 'estado']
                        }
                    ],
                    attributes: ['id_estado']
                }
            ],
            attributes: ['id_ferias', 'data_inicio', 'data_fim', 'id_user']
        });

        // Filtrar apenas as férias com estado "Pendente" (id_estado === 3)
        const pendentes = ferias.filter(item => item.estado_ferias.some(estado => estado.estado.id_estado === 3)); // 3 = Pendente

        res.json(pendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Listar férias por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const ferias = await Ferias.findByPk(id_ferias);
        if (ferias) {
            res.json(ferias);
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novas férias
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { data_inicio, data_fim, id_user } = req.body;

        // Criar o registro de férias na base de dados
        const ferias = await Ferias.create({
            data_inicio,
            data_fim,
            id_user
        });


        // Criar o registro na tabela estado_ferias com id_estado 3
        await EstadoFerias.create({
            id_ferias: ferias.id_ferias, // O id do registro de férias recém-criado
            id_estado: 3 // O id do estado que você deseja definir
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(ferias);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar férias:', error);

        // Responder com status 500 e a mensagem de erro
        res.status(500).json({ error: error.message });
    }
};



// Atualizar férias por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const [updated] = await Ferias.update(req.body, {
            where: { id_ferias }
        });
        if (updated) {
            const updatedFerias = await Ferias.findByPk(id_ferias);
            res.json(updatedFerias);
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar férias por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const deleted = await Ferias.destroy({
            where: { id_ferias }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as férias pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das férias com estado pendente
        const feriasPendentesIds = await EstadoFerias.findAll({
            where: { id_estado: 3 },
            attributes: ['id_ferias'] // Retornamos apenas os IDs das férias pendentes
        });

        // Se não houver férias pendentes, retornamos uma lista vazia
        if (feriasPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das férias pendentes
        const ids = feriasPendentesIds.map(item => item.id_ferias);

        // Encontramos as férias com os IDs filtrados
        const feriasPendentes = await Ferias.findAll({
            where: { id_ferias: ids },
            include: [
                {
                    model: Utilizador,
                    as: 'utilizador', // Certifique-se de que 'utilizador' é o alias correto
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as férias pendentes
        res.json(feriasPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das férias por ID
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const { id_estado, fcmToken } = req.body; // fcmToken vem da app Flutter

        // Atualizar o estado_ferias com o novo id_estado
        const [updated] = await EstadoFerias.update(
            { id_estado },
            { where: { id_ferias } }
        );

        if (updated) {
            // Enviar notificação push se a atualização foi bem-sucedida
            const message = {
                notification: {
                    title: 'Estado das Férias Atualizado',
                    body: `O estado das férias ${id_ferias} foi atualizado para ${id_estado}`,
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
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};