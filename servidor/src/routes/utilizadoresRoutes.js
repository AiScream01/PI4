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
// Criar um novo utilizador com múltiplos arquivos (foto, declaração bancária e acadêmica)
router.post('/create', upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'declaracao_academica', maxCount: 1 },
    { name: 'declaracao_bancaria', maxCount: 1 }
  ]), utilizadoresController.criar);

// Atualizar um utilizador por ID com múltiplos arquivos (foto, declaração bancária e acadêmica)
router.put('/update/:id', upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'declaracao_academica', maxCount: 1 },
    { name: 'declaracao_bancaria', maxCount: 1 }
  ]), utilizadoresController.atualizar);

// Eliminar um utilizador por ID
router.delete('/delete/:id', utilizadoresController.eliminar);

//Fazer login
router.post('/login', utilizadoresController.login);

module.exports = router;
