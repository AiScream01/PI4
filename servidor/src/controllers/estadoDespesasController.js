const EstadoDespesas = require('../models/estado_despesas');

// Listar todos os estados de despesas
exports.listarTodos = async (req, res) => {
    try {
        const estados = await EstadoDespesas.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado de despesa por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_estado, id_despesa } = req.params;
        const estado = await EstadoDespesas.findOne({
            where: { id_estado, id_despesa }
        });
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado de despesa não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado de despesa
exports.criar = async (req, res) => {
    try {
        const estado = await EstadoDespesas.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado de despesa por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_estado, id_despesa } = req.params;
        const [updated] = await EstadoDespesas.update(req.body, {
            where: { id_estado, id_despesa }
        });
        if (updated) {
            const updatedEstado = await EstadoDespesas.findOne({
                where: { id_estado, id_despesa }
            });
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado de despesa não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado de despesa por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_estado, id_despesa } = req.params;
        const deleted = await EstadoDespesas.destroy({
            where: { id_estado, id_despesa }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado de despesa não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
