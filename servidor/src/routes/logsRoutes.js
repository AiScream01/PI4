const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

// Listar todos os logs
router.get('/', logsController.listarTodos);

// Listar log por ID
router.get('/:id_log', logsController.listarPorId);

// Criar novo log
router.post('/create', logsController.criar);

// Atualizar log por ID
router.put('/update/:id_log', logsController.atualizar);

// Eliminar log por ID
router.delete('/delete/:id_log', logsController.eliminar);

module.exports = router;
