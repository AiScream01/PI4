const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Importação do bcrypt para hash da palavra-passe
const utilizadoresController = require('../controllers/utilizadoresController');

// Listar todos os utilizadores
router.get('/', utilizadoresController.listarTodos);

// Listar um utilizador por ID
router.get('/:id', utilizadoresController.listarPorId);

// Criar um novo utilizador
router.post('/create', utilizadoresController.criar);

// Atualizar um utilizador por ID
router.put('/update/:id', utilizadoresController.atualizar);

// Eliminar um utilizador por ID
router.delete('/delete/:id', utilizadoresController.eliminar);

//Fazer login
router.post('/login', utilizadoresController.login);

module.exports = router;
