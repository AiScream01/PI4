const Noticias = require('../models/noticias');

// Listar todas as notícias
exports.listarTodos = async (req, res) => {
    try {
        const noticias = await Noticias.findAll();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar notícia por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const noticia = await Noticias.findByPk(id_noticia);
        if (noticia) {
            res.json(noticia);
        } else {
            res.status(404).json({ message: 'Notícia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova notícia
exports.criar = async (req, res) => {
    console.log(req.body)
    try {
        const { titulo, descricao, data } = req.body;
        const noticia = await Noticias.create({
            titulo,
            descricao,
            data,
            imagem: req.file ? req.file.filename : null,
        });
        res.status(201).json(noticia);
    } catch (error) {
        console.error('Erro ao criar notícia:', error);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar notícia por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        if(req.file){
            req.body.imagem = req.file.filename; 
        }
        const [updated] = await Noticias.update(req.body, {
            where: { id_noticia }
        });
        if (updated) {
            const updatedNoticia = await Noticias.findByPk(id_noticia);
            res.json(updatedNoticia);
        } else {
            res.status(404).json({ message: 'Notícia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar notícia por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const deleted = await Noticias.destroy({
            where: { id_noticia }
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
