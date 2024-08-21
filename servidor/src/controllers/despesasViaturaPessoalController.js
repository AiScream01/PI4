const DespesasViaturaPessoal = require('../models/despesas_viatura_pessoal');
const EstadoDespesa = require('../models/estado_despesas'); // Ajuste o caminho conforme necessário
const Estado = require('../models/estado'); // Ajuste o caminho conforme necessário
const Utilizador = require ('../models/utilizadores.js')

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

// Listar todas as despesas de viatura pessoal pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das despesas com estado pendente
        const despesasPendentesIds = await EstadoDespesa.findAll({
            where: { id_estado: 3 },
            attributes: ['id_despesa'] // Retornamos apenas os IDs das despesas pendentes
        });

        // Se não houver despesas pendentes, retornamos uma lista vazia
        if (despesasPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das despesas pendentes
        const ids = despesasPendentesIds.map(item => item.id_despesa);

        // Encontramos as despesas com os IDs filtrados
        const despesasPendentes = await DespesasViaturaPessoal.findAll({
            where: { id_despesa: ids },
            include: [
                {
                    model: EstadoDespesa,
                    include: [{
                        model: Estado,
                        where: {
                            id_estado: 3 // Aqui colocamos o ID do estado "pendente"
                        }
                    }],
                    required: true // Garante que somente despesas com estado pendente sejam retornadas
                },
                {
                    model: Utilizador,
                    as: 'utilizador', // Certifique-se de que este é o nome correto da associação
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as despesas pendentes
        res.json(despesasPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
