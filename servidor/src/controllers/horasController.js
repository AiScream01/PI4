const Horas = require('../models/horas');
const EstadoHoras = require('../models/estado_horas'); // Supondo que exista um model para estado_horas
const Estado = require('../models/estado'); // Supondo que exista um model para estado
const Utilizador = require ('../models/utilizadores.js')


// Listar todas as horas
exports.listarTodos = async (req, res) => {
    try {
        const horas = await Horas.findAll();
        res.json(horas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as horas pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das horas com estado pendente
        const horasPendentesIds = await EstadoHoras.findAll({
            where: { id_estado: 3 },
            attributes: ['id_horas'] // Retornamos apenas os IDs das horas pendentes
        });

        // Se não houver horas pendentes, retornamos uma lista vazia
        if (horasPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das horas pendentes
        const ids = horasPendentesIds.map(item => item.id_horas);

        // Encontramos as horas com os IDs filtrados
        const horasPendentes = await Horas.findAll({
            where: { id_horas: ids },
            include: [
                {
                    model: Utilizador,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as horas pendentes
        res.json(horasPendentes);
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

// Criar novo registro de horas
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { horas, id_user } = req.body;

        // Criar o registro de horas na base de dados
        const novoRegistroHoras = await Horas.create({
            horas,
            id_user
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(novoRegistroHoras);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar registro de horas:', error);
        
        // Responder com status 500 e a mensagem de erro
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


// Atualizar o estado das horas por ID
exports.atualizarEstadoHoras = async (req, res) => {
    try {
        const { id_horas } = req.params;
        const { id_estado } = req.body;

        // Atualiza o estado_hooras com o novo id_estado
        const [updated] = await EstadoHoras.update(
            { id_estado },
            { where: { id_horas } }
        );

        if (updated) {
            res.json({ message: 'Estado atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Horas não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

