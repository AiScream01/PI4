const express = require('express');
const router = express.Router();
const multer = require('multer');
const noticiasController = require('../controllers/noticiasController');
const storage = require('../multer_config');
  
// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Listar todas as notícias
router.get('/', noticiasController.listarTodos);

// Listar uma notícia por ID
router.get('/:id_noticia', noticiasController.listarPorId);

// Criar uma nova notícia
router.post('/create', upload.single('imagem'), noticiasController.criar);

// Atualizar uma notícia por ID
router.put('/update/:id_noticia', upload.single('imagem'), noticiasController.atualizar);

// Eliminar uma notícia por ID
router.delete('/delete/:id_noticia', noticiasController.eliminar);

module.exports = router;
