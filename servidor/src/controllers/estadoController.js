const Estado = require('../models/estado');

// Listar todos os estados
exports.listarTodos = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um estado por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const estado = await Estado.findByPk(id_estado);
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novo estado
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { estado } = req.body;

        // Criar o registro de estado na base de dados
        const novoEstado = await Estado.create({
            estado
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(novoEstado);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar estado:', error);
        
        // Responder com status 500 e a mensagem de erro
        res.status(500).json({ error: error.message });
    }
};


// Atualizar um estado por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const [updated] = await Estado.update(req.body, {
            where: { id_estado }
        });
        if (updated) {
            const updatedEstado = await Estado.findByPk(id_estado);
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um estado por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_estado } = req.params;
        const deleted = await Estado.destroy({
            where: { id_estado }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
