const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const noticiasController = require('../controllers/noticiasController');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Correct the destination to always be 'src/uploads' relative to the project's root
        cb(null, path.join(__dirname, '..', 'uploads')); // Go up one directory from 'routes' and then into 'uploads'
    },
    filename: function (req, file, cb) {
        // Use Date.now() to generate a unique filename with the original file extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
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
