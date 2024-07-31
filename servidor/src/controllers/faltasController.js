const Faltas = require('../models/faltas');

// Listar todas as faltas
exports.listarTodos = async (req, res) => {
    try {
        const faltas = await Faltas.findAll();
        res.json(faltas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar uma falta por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const falta = await Faltas.findByPk(id_falta);
        if (falta) {
            res.json(falta);
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar uma nova falta
exports.criar = async (req, res) => {
    try {
        const falta = await Faltas.create(req.body);
        res.status(201).json(falta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma falta por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const [updated] = await Faltas.update(req.body, {
            where: { id_falta }
        });
        if (updated) {
            const updatedFalta = await Faltas.findByPk(id_falta);
            res.json(updatedFalta);
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar uma falta por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const deleted = await Faltas.destroy({
            where: { id_falta }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
