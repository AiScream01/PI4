const EstadoHoras = require('../models/estado_horas');

// Listar todos os estados de horas
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoHoras.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de horas por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_horas } = req.params;
        const estado = await EstadoHoras.findOne({
            where: { id_estado, id_horas }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de horas não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de horas
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoHoras.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de horas por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_horas } = req.params;
        const [updated] = await EstadoHoras.update(req.body, {
            where: { id_estado, id_horas }
        });
        if (updated) {
            const updatedEstado = await EstadoHoras.findOne({
                where: { id_estado, id_horas }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de horas não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de horas por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_horas } = req.params;
        const deleted = await EstadoHoras.destroy({
            where: { id_estado, id_horas }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de horas não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
