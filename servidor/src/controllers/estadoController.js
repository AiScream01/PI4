const Estado = require('../models/estado');

// Listar todos os estados
exports.listarTodos = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const estado = await Estado.findByPk(id_estado);
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo estado
exports.criar = async (req, res) => {
    try {
        const estado = await Estado.create(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um estado por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const [updated] = await Estado.update(req.body, {
            where: { id_estado }
        });
        if (updated) {
            const updatedEstado = await Estado.findByPk(id_estado);
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const deleted = await Estado.destroy({
            where: { id_estado }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
