const EstadoAjudas = require('../models/estado_ajudas');

// Listar todos os estados de ajudas
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoAjudas.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de ajuda por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_custo } = req.params;
        const estado = await EstadoAjudas.findOne({
            where: { id_estado, id_custo }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de ajuda não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de ajuda
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoAjudas.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de ajuda por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_custo } = req.params;
        const [updated] = await EstadoAjudas.update(req.body, {
            where: { id_estado, id_custo }
        });
        if (updated) {
            const updatedEstado = await EstadoAjudas.findOne({
                where: { id_estado, id_custo }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de ajuda não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de ajuda por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_custo } = req.params;
        const deleted = await EstadoAjudas.destroy({
            where: { id_estado, id_custo }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de ajuda não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
