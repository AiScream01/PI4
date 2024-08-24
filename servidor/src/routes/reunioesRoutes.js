const express = require('express');
const router = express.Router();
const reunioesController = require('../controllers/reunioesController');

// Listar todas as reuniões
router.get('/', reunioesController.listarTodos);

// Listar todas as reuniões
router.get('/pendentes', reunioesController.listarPendentes);

// Listar reunião por ID
router.get('/:id_reuniao', reunioesController.listarPorId);

// Criar nova reunião
router.post('/create', reunioesController.criar);

// Atualizar reunião por ID
router.put('/update/:id_reuniao', reunioesController.atualizar);

//Atualizar estado de reuniões por id
router.put('/estado/:id_reuniao', reunioesController.atualizarEstado);

// Eliminar reunião por ID
router.delete('/delete/:id_reuniao', reunioesController.eliminar);

module.exports = router;
