const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Importação do bcrypt para hash da palavra-passe
const multer = require('multer');
const path = require('path');
const utilizadoresController = require('../controllers/utilizadoresController');

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

// Listar todos os utilizadores
router.get('/', utilizadoresController.listarTodos);

// Listar um utilizador por ID
router.get('/:id', utilizadoresController.listarPorId);

// Criar um novo utilizador
router.post('/create', upload.single('foto'), utilizadoresController.criar);

// Atualizar um utilizador por ID
router.put('/update/:id', upload.single('foto'), utilizadoresController.atualizar);

// Eliminar um utilizador por ID
router.delete('/delete/:id', utilizadoresController.eliminar);

//Fazer login
router.post('/login', utilizadoresController.login);

module.exports = router;
