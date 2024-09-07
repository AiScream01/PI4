const Faltas = require('../models/faltas');
const EstadoFaltas = require('../models/estado_faltas.js'); // Supondo que exista um model para estado_horas
const Estado = require('../models/estado'); // Supondo que exista um model para estado
const Utilizador = require ('../models/utilizadores.js')

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
        const { data, id_user, horas    } = req.body;

        // Se houver um arquivo PDF carregado, gerar o caminho correto
        const justificacao = req.file ? `/${req.file.filename}` : ''; // Caminho do arquivo PDF


        // Criar o registro de falta na base de dados
        const novaFalta = await Faltas.create({
            data,
            justificacao,
            id_user,
            horas
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
        const { id_estado } = req.body;

        // Atualizar o estado_faltas com o novo id_estado
        const [updated] = await EstadoFaltas.update(
            { id_estado },
            { where: { id_falta } }
        );

        if (updated) {
            res.json({ message: 'Estado atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
