const EstadoReuniao = require('../models/estado_reuniao');

// Listar todos os estados de reunião
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoReuniao.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de reunião por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_reuniao } = req.params;
        const estado = await EstadoReuniao.findOne({
            where: { id_estado, id_reuniao }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de reunião não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de reunião
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoReuniao.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de reunião por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_reuniao } = req.params;
        const [updated] = await EstadoReuniao.update(req.body, {
            where: { id_estado, id_reuniao }
        });
        if (updated) {
            const updatedEstado = await EstadoReuniao.findOne({
                where: { id_estado, id_reuniao }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de reunião não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de reunião por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_reuniao } = req.params;
        const deleted = await EstadoReuniao.destroy({
            where: { id_estado, id_reuniao }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de reunião não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
