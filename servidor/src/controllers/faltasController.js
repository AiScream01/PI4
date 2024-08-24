const Faltas = require('../models/faltas');
const EstadoFaltas = require('../models/estado_faltas.js'); // Supondo que exista um model para estado_horas
const Estado = require('../models/estado'); // Supondo que exista um model para estado
const Utilizador = require ('../models/utilizadores.js')

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


// Listar todas as faltas pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das faltas com estado pendente
        const faltasPendentesIds = await EstadoFaltas.findAll({
            where: { id_estado: 3 }, // Estado pendente
            attributes: ['id_falta'] // Retornamos apenas os IDs das faltas pendentes
        });

        // Se não houver faltas pendentes, retornamos uma lista vazia
        if (faltasPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das faltas pendentes
        const ids = faltasPendentesIds.map(item => item.id_falta);

        // Encontramos as faltas com os IDs filtrados
        const faltasPendentes = await Faltas.findAll({
            where: { id_falta: ids },
            include: [
                {
                    model: Utilizador,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as faltas pendentes
        res.json(faltasPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das faltas por ID
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_falta } = req.params;
        const { id_estado } = req.body;

        // Atualizar o estado_faltas com o novo id_estado
        const [updated] = await EstadoFaltas.update(
            { id_estado },
            { where: { id_falta } }
        );

        if (updated) {
            res.json({ message: 'Estado atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Falta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};