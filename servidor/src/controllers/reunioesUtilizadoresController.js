const ReunioesUtilizadores = require('../models/reunioes_utilizadores');

// Listar todos os registros de reunião e utilizadores
exports.listarTodos = async (req, res) => {
    try {
        const reunioesUtilizadores = await ReunioesUtilizadores.findAll();
        res.json(reunioesUtilizadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar registro de reunião e utilizador por IDs
exports.listarPorIds = async (req, res) => {
    try {
        const { id_user, id_reuniao } = req.params;
        const reuniaoUtilizador = await ReunioesUtilizadores.findOne({
            where: {
                id_user,
                id_reuniao
            }
        });
        if (reuniaoUtilizador) {
            res.json(reuniaoUtilizador);
        } else {
            res.status(404).json({ message: 'Registro de reunião e utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novo registro de reunião e utilizador
exports.criar = async (req, res) => {
    try {
        const reuniaoUtilizador = await ReunioesUtilizadores.create(req.body);
        res.status(201).json(reuniaoUtilizador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar registro de reunião e utilizador por IDs
exports.atualizar = async (req, res) => {
    try {
        const { id_user, id_reuniao } = req.params;
        const [updated] = await ReunioesUtilizadores.update(req.body, {
            where: {
                id_user,
                id_reuniao
            }
        });
        if (updated) {
            const updatedReuniaoUtilizador = await ReunioesUtilizadores.findOne({
                where: {
                    id_user,
                    id_reuniao
                }
            });
            res.json(updatedReuniaoUtilizador);
        } else {
            res.status(404).json({ message: 'Registro de reunião e utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar registro de reunião e utilizador por IDs
exports.eliminar = async (req, res) => {
    try {
        const { id_user, id_reuniao } = req.params;
        const deleted = await ReunioesUtilizadores.destroy({
            where: {
                id_user,
                id_reuniao
            }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Registro de reunião e utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
