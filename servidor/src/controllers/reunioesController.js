const Reunioes = require('../models/reunioes');

// Listar todas as reuniões
exports.listarTodos = async (req, res) => {
    try {
        const reunioes = await Reunioes.findAll();
        res.json(reunioes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar reunião por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const reuniao = await Reunioes.findByPk(id);
        if (reuniao) {
            res.json(reuniao);
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova reunião
exports.criar = async (req, res) => {
    try {
        const reuniao = await Reunioes.create(req.body);
        res.status(201).json(reuniao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar reunião por ID
exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Reunioes.update(req.body, {
            where: { id_reuniao: id }
        });
        if (updated) {
            const updatedReuniao = await Reunioes.findByPk(id);
            res.json(updatedReuniao);
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar reunião por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reunioes.destroy({
            where: { id_reuniao: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
