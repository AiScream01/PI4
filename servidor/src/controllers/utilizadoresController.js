const Utilizadores = require('../models/utilizadores');
const TiposUtilizador = require('../models/tipos_utilizador');
const bcrypt = require('bcrypt'); // Importação do bcrypt para hash da palavra-passe

// Listar todos os utilizadores
exports.listarTodos = async (req, res) => {
    try {
        const utilizadores = await Utilizadores.findAll({
            include: [{
                model: TiposUtilizador,
                attributes: ['id_tipo', 'tipo'] // Inclua os campos que deseja retornar
            }]
        });
        res.json(utilizadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar um utilizador por ID
exports.listarPorId = async (req, res) => {
    try {
        const utilizador = await Utilizadores.findByPk(req.params.id);
        if (utilizador) {
            res.json(utilizador);
        } else {
            res.status(404).json({ message: 'Utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo utilizador
exports.criar = async (req, res) => {
    try {
        // Criptografa a senha usando bcrypt
        const hashedPassword = await bcrypt.hash(req.body.palavrapasse, 10);
        
        // Substitui a senha no corpo da requisição pela versão criptografada
        const utilizadorData = {
            ...req.body,
            palavrapasse: hashedPassword
        };

        // Cria o utilizador no banco de dados
        const utilizador = await Utilizadores.create(utilizadorData);
        
        res.status(201).json(utilizador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um utilizador por ID
exports.atualizar = async (req, res) => {
    try {
        const [updated] = await Utilizadores.update(req.body, {
            where: { id_user: req.params.id }
        });
        if (updated) {
            const updatedUtilizador = await Utilizadores.findByPk(req.params.id);
            res.json(updatedUtilizador);
        } else {
            res.status(404).json({ message: 'Utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar um utilizador por ID
exports.eliminar = async (req, res) => {
    try {
        const deleted = await Utilizadores.destroy({
            where: { id_user: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
