const Reunioes = require('../models/reunioes');
const EstadoReunioes = require('../models/estado_reuniao');
const Estado = require('../models/estado'); // Supondo que exista um model para estado
const Utilizador = require ('../models/utilizadores.js')

// Listar todas as reuniões
exports.listarTodos = async (req, res) => {
    try {
        const reunioes = await Reunioes.findAll();
        res.json(reunioes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as reuniões pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das reuniões com estado pendente
        const reunioesPendentesIds = await EstadoReunioes.findAll({
            where: { id_estado: 3 }, // Assumindo que o estado 3 é o estado "pendente"
            attributes: ['id_reuniao'] // Retornamos apenas os IDs das reuniões pendentes
        });

        // Se não houver reuniões pendentes, retornamos uma lista vazia
        if (reunioesPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das reuniões pendentes
        const ids = reunioesPendentesIds.map(item => item.id_reuniao);

        // Encontramos as reuniões com os IDs filtrados
        const reunioesPendentes = await Reunioes.findAll({
            where: { id_reuniao: ids },
            include: [
                {
                    model: Utilizador,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as reuniões pendentes
        res.json(reunioesPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar reunião por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const reuniao = await Reunioes.findByPk(id);
        if (reuniao) {
            res.json(reuniao);
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova reunião
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { titulo, descricao, data, id_user } = req.body;

        // Criar o registro de reunião na base de dados
        const novaReuniao = await Reunioes.create({
            titulo,
            descricao,
            data,
            id_user
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(novaReuniao);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar reunião:', error);
        
        // Responder com status 500 e a mensagem de erro
        res.status(500).json({ error: error.message });
    }
};


// Atualizar reunião por ID
exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Reunioes.update(req.body, {
            where: { id_reuniao: id }
        });
        if (updated) {
            const updatedReuniao = await Reunioes.findByPk(id);
            res.json(updatedReuniao);
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar reunião por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reunioes.destroy({
            where: { id_reuniao: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Reunião não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar reuniao das férias por ID
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_reuniao } = req.params;
        const { id_estado } = req.body;

        // Atualizar o estado_reuniao com o novo id_estado
        const [updated] = await EstadoReunioes.update(
            { id_estado },
            { where: { id_reuniao } }
        );

        if (updated) {
            res.json({ message: 'Estado atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Férias não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};