const EstadoFerias = require('../models/estado_ferias');

// Listar todos os estados de férias
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoFerias.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de férias por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_ferias } = req.params;
        const estado = await EstadoFerias.findOne({
            where: { id_estado, id_ferias }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de férias não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de férias
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoFerias.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de férias por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_ferias } = req.params;
        const [updated] = await EstadoFerias.update(req.body, {
            where: { id_estado, id_ferias }
        });
        if (updated) {
            const updatedEstado = await EstadoFerias.findOne({
                where: { id_estado, id_ferias }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de férias não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de férias por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_ferias } = req.params;
        const deleted = await EstadoFerias.destroy({
            where: { id_estado, id_ferias }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de férias não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
