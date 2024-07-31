const Logs = require('../models/logs');

// Listar todos os logs
exports.listarTodos = async (req, res) => {
    try {
        const logs = await Logs.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar logs por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_log } = req.params;
        const log = await Logs.findByPk(id_log);
        if (log) {
            res.json(log);
        } else {
            res.status(404).json({ message: 'Log não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novo log
exports.criar = async (req, res) => {
    try {
        const log = await Logs.create(req.body);
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar log por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_log } = req.params;
        const [updated] = await Logs.update(req.body, {
            where: { id_log }
        });
        if (updated) {
            const updatedLog = await Logs.findByPk(id_log);
            res.json(updatedLog);
        } else {
            res.status(404).json({ message: 'Log não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar log por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_log } = req.params;
        const deleted = await Logs.destroy({
            where: { id_log }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Log não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
