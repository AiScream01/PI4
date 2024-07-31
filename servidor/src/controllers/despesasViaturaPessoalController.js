const DespesasViaturaPessoal = require('../models/despesas_viatura_pessoal');

// Listar todas as despesas de viatura pessoal
exports.listarTodos = async (req, res) => {
    try {
        const despesas = await DespesasViaturaPessoal.findAll();
        res.json(despesas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar uma despesa por ID
exports.listarPorId = async (req, res) => {
    try {
        const despesa = await DespesasViaturaPessoal.findByPk(req.params.id);
        if (despesa) {
            res.json(despesa);
        } else {
            res.status(404).json({ message: 'Despesa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar uma nova despesa
exports.criar = async (req, res) => {
    try {
        const despesa = await DespesasViaturaPessoal.create(req.body);
        res.status(201).json(despesa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma despesa por ID
exports.atualizar = async (req, res) => {
    try {
        const [updated] = await DespesasViaturaPessoal.update(req.body, {
            where: { id_despesa: req.params.id }
        });
        if (updated) {
            const updatedDespesa = await DespesasViaturaPessoal.findByPk(req.params.id);
            res.json(updatedDespesa);
        } else {
            res.status(404).json({ message: 'Despesa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar uma despesa por ID
exports.eliminar = async (req, res) => {
    try {
        const deleted = await DespesasViaturaPessoal.destroy({
            where: { id_despesa: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Despesa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
