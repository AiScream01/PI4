const Horas = require('../models/horas');

// Listar todas as horas
exports.listarTodos = async (req, res) => {
    try {
        const horas = await Horas.findAll();
        res.json(horas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar horas por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_horas } = req.params;
        const horas = await Horas.findByPk(id_horas);
        if (horas) {
            res.json(horas);
        } else {
            res.status(404).json({ message: 'Horas não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novas horas
exports.criar = async (req, res) => {
    try {
        const horas = await Horas.create(req.body);
        res.status(201).json(horas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar horas por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_horas } = req.params;
        const [updated] = await Horas.update(req.body, {
            where: { id_horas }
        });
        if (updated) {
            const updatedHoras = await Horas.findByPk(id_horas);
            res.json(updatedHoras);
        } else {
            res.status(404).json({ message: 'Horas não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar horas por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_horas } = req.params;
        const deleted = await Horas.destroy({
            where: { id_horas }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Horas não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
