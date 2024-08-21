// controllers/feriasController.js
const Ferias = require('../models/ferias');
const EstadoFerias = require('../models/estado_ferias');
const Estado = require('../models/estado');
const Utilizador = require('../models/utilizadores')

// Listar todas as férias com o estado correspondente
exports.listarTodos = async (req, res) => {
    try {
        const ferias = await Ferias.findAll({
            include: [
                {
                    model: EstadoFerias,
                    include: [
                        {
                            model: Estado,
                            attributes: ['id_estado', 'estado']
                        }
                    ],
                    attributes: ['id_estado']
                }
            ],
            attributes: ['id_ferias', 'data_inicio', 'data_fim', 'id_user']
        });

        // Filtrar apenas as férias com estado "Pendente" (id_estado === 3)
        const pendentes = ferias.filter(item => item.estado_ferias.some(estado => estado.estado.id_estado === 3)); // 3 = Pendente

        res.json(pendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Listar férias por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const ferias = await Ferias.findByPk(id_ferias);
        if (ferias) {
            res.json(ferias);
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novas férias
exports.criar = async (req, res) => {
    try {
        const ferias = await Ferias.create(req.body);
        res.status(201).json(ferias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar férias por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const [updated] = await Ferias.update(req.body, {
            where: { id_ferias }
        });
        if (updated) {
            const updatedFerias = await Ferias.findByPk(id_ferias);
            res.json(updatedFerias);
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar férias por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_ferias } = req.params;
        const deleted = await Ferias.destroy({
            where: { id_ferias }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as férias pendentes
exports.listarPendentes = async (req, res) => {
    try {
        const feriasPendentes = await Ferias.findAll({
            include: [
                {
                    model: EstadoFerias,
                    include: [{
                        model: Estado,
                        where: {
                            id_estado: 3 // Aqui colocamos o ID do estado "pendente"
                        }
                    }]
                },
                {
                    model: Utilizador,
                    as: 'utilizador', // Substitua pelo nome correto da associação, se for diferente
                    attributes: ['nome', 'foto']
                }
            ]
        });
        res.json(feriasPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
