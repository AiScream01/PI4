const express = require('express');
const router = express.Router();
const reunioesUtilizadoresController = require('../controllers/reunioesUtilizadoresController');

// Listar todos os registros de reunião e utilizadores
router.get('/', reunioesUtilizadoresController.listarTodos);

// Listar registro de reunião e utilizador por IDs
router.get('/:id_user/:id_reuniao', reunioesUtilizadoresController.listarPorIds);

// Criar novo registro de reunião e utilizador
router.post('/create', reunioesUtilizadoresController.criar);

// Atualizar registro de reunião e utilizador por IDs
router.put('/update/:id_user/:id_reuniao', reunioesUtilizadoresController.atualizar);

// Eliminar registro de reunião e utilizador por IDs
router.delete('/delete/:id_user/:id_reuniao', reunioesUtilizadoresController.eliminar);

module.exports = router;
