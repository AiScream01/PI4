const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Importação do bcrypt para hash da palavra-passe
const multer = require('multer');
const utilizadoresController = require('../controllers/utilizadoresController');
const storage = require('../multer_config');

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Listar todos os utilizadores
router.get('/', utilizadoresController.listarTodos);

// Listar um utilizador por ID
router.get('/:id', utilizadoresController.listarPorId);

// Criar um novo utilizador
router.post('/create', upload.single('foto'), upload.single('declaracao_academica'), upload.single('declaracao_bancaria'), utilizadoresController.criar);

// Atualizar um utilizador por ID
router.put('/update/:id', upload.single('foto'), upload.single('declaracao_academica'), upload.single('declaracao_bancaria'), utilizadoresController.atualizar);

// Eliminar um utilizador por ID
router.delete('/delete/:id', utilizadoresController.eliminar);

//Fazer login
router.post('/login', utilizadoresController.login);

module.exports = router;
