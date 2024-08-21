const AjudasCusto = require('../models/ajudas_custo');
const Utilizadores = require('../models/utilizadores');
const EstadoAjudas = require('../models/estado_ajudas'); // Certifique-se de que o modelo existe
const Estado = require('../models/estado'); // Certifique-se de que o modelo existe

// Listar todas as ajudas de custo
exports.listarTodos = async (req, res) => {
    try {
        const ajudasCusto = await AjudasCusto.findAll({
            include: [
                {
                    model: Utilizadores,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });
        res.json(ajudasCusto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as ajudas de custo pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das ajudas de custo com estado pendente
        const ajudasCustoPendentesIds = await EstadoAjudas.findAll({
            where: { id_estado: 3 },
            attributes: ['id_custo'] // Retornamos apenas os IDs das ajudas de custo pendentes
        });

        // Se não houver ajudas de custo pendentes, retornamos uma lista vazia
        if (ajudasCustoPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das ajudas de custo pendentes
        const ids = ajudasCustoPendentesIds.map(item => item.id_custo);

        // Encontramos as ajudas de custo com os IDs filtrados
        const ajudasCustoPendentes = await AjudasCusto.findAll({
            where: { id_custo: ids },
            include: [
                {
                    model: Utilizadores,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as ajudas de custo pendentes
        res.json(ajudasCustoPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Listar ajudas de custo por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const ajudaCusto = await AjudasCusto.findByPk(id_custo);
        if (ajudaCusto) {
            res.json(ajudaCusto);
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova ajuda de custo
exports.criar = async (req, res) => {
    try {
        const ajudaCusto = await AjudasCusto.create(req.body);
        res.status(201).json(ajudaCusto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar ajuda de custo por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const [updated] = await AjudasCusto.update(req.body, {
            where: { id_custo }
        });
        if (updated) {
            const updatedAjudaCusto = await AjudasCusto.findByPk(id_custo);
            res.json(updatedAjudaCusto);
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das ajudas de custo
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_estado, id_custo } = req.params;
        const { novo_estado } = req.body;

        // Verifica se o estado e a ajuda de custo existem
        const estadoAjudas = await EstadoAjudas.findOne({ where: { id_estado, id_custo } });

        if (!estadoAjudas) {
            return res.status(404).json({ message: 'EstadoAjudas não encontrado' });
        }

        // Atualiza o estado
        const [updated] = await EstadoAjudas.update({ id_estado: novo_estado }, {
            where: { id_estado, id_custo }
        });

        if (updated) {
            const updatedEstadoAjudas = await EstadoAjudas.findOne({ where: { id_estado, id_custo } });
            res.json(updatedEstadoAjudas);
        } else {
            res.status(404).json({ message: 'Erro ao atualizar EstadoAjudas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar ajuda de custo por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const deleted = await AjudasCusto.destroy({
            where: { id_custo }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
