const RecibosVencimento = require('../models/recibos_vencimento');

// Listar todos os recibos de vencimento
exports.listarTodos = async (req, res) => {
    try {
        const recibos = await RecibosVencimento.findAll();
        res.json(recibos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar recibo de vencimento por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_recibo } = req.params;
        const recibo = await RecibosVencimento.findByPk(id_recibo);
        if (recibo) {
            res.json(recibo);
        } else {
            res.status(404).json({ message: 'Recibo de vencimento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novo recibo de vencimento
exports.criar = async (req, res) => {
    try {
        const recibo = await RecibosVencimento.create(req.body);
        res.status(201).json(recibo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar recibo de vencimento por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_recibo } = req.params;
        const [updated] = await RecibosVencimento.update(req.body, {
            where: { id_recibo }
        });
        if (updated) {
            const updatedRecibo = await RecibosVencimento.findByPk(id_recibo);
            res.json(updatedRecibo);
        } else {
            res.status(404).json({ message: 'Recibo de vencimento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar recibo de vencimento por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_recibo } = req.params;
        const deleted = await RecibosVencimento.destroy({
            where: { id_recibo }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Recibo de vencimento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
