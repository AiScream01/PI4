const TiposUtilizador = require('../models/tipos_utilizador');

// Listar todos os tipos de utilizador
exports.listarTodos = async (req, res) => {
    try {
        const tipos = await TiposUtilizador.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar tipo de utilizador por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await TiposUtilizador.findByPk(id);
        if (tipo) {
            res.json(tipo);
        } else {
            res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar novo tipo de utilizador
exports.criar = async (req, res) => {
    try {
        const tipo = await TiposUtilizador.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar tipo de utilizador por ID
exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await TiposUtilizador.update(req.body, {
            where: { id_tipo: id }
        });
        if (updated) {
            const updatedTipo = await TiposUtilizador.findByPk(id);
            res.json(updatedTipo);
        } else {
            res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar tipo de utilizador por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TiposUtilizador.destroy({
            where: { id_tipo: id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
