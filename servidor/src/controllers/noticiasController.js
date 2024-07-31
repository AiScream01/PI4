const Noticias = require('../models/noticias');

// Listar todos as notícias
exports.listarTodos = async (req, res) => {
    try {
        const noticias = await Noticias.findAll();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar uma notícia por ID
exports.listarPorId = async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if (noticia) {
            res.json(noticia);
        } else {
            res.status(404).json({ message: 'Notícia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar uma nova notícia
exports.criar = async (req, res) => {
    try {
        const noticia = await Noticias.create(req.body);
        res.status(201).json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma notícia por ID
exports.atualizar = async (req, res) => {
    try {
        const [updated] = await Noticias.update(req.body, {
            where: { id_noticia: req.params.id }
        });
        if (updated) {
            const updatedNoticia = await Noticias.findByPk(req.params.id);
            res.json(updatedNoticia);
        } else {
            res.status(404).json({ message: 'Notícia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar uma notícia por ID
exports.eliminar = async (req, res) => {
    try {
        const deleted = await Noticias.destroy({
            where: { id_noticia: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Notícia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
