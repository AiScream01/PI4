const express = require('express');
const router = express.Router();
const reunioesController = require('../controllers/reunioesController');

// Listar todas as reuniões
router.get('/', reunioesController.listarTodos);

// Listar reunião por ID
router.get('/:id', reunioesController.listarPorId);

// Criar nova reunião
router.post('/create', reunioesController.criar);

// Atualizar reunião por ID
router.put('/update/:id', reunioesController.atualizar);

// Eliminar reunião por ID
router.delete('/delete/:id', reunioesController.eliminar);

module.exports = router;
