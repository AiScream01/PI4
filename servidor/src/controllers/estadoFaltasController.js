const EstadoFaltas = require('../models/estado_faltas');

// Listar todos os estados de faltas
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoFaltas.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de falta por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_falta } = req.params;
        const estado = await EstadoFaltas.findOne({
            where: { id_estado, id_falta }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de falta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de falta
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoFaltas.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de falta por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_falta } = req.params;
        const [updated] = await EstadoFaltas.update(req.body, {
            where: { id_estado, id_falta }
        });
        if (updated) {
            const updatedEstado = await EstadoFaltas.findOne({
                where: { id_estado, id_falta }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de falta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de falta por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_falta } = req.params;
        const deleted = await EstadoFaltas.destroy({
            where: { id_estado, id_falta }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de falta não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
