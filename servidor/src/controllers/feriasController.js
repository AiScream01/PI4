const Ferias = require('../models/ferias');

// Listar todas as férias
exports.listarTodos = async (req, res) => {
    try {
        const ferias = await Ferias.findAll();
        res.json(ferias);
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
        const ferias = await Ferias.create(req.body);
        res.status(201).json(ferias);
    } catch (error) {
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
