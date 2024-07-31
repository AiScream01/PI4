const express = require('express');
const router = express.Router();
const estadoFaltasController = require('../controllers/estadoFaltasController');

// Listar todos os estados de faltas
router.get('/', estadoFaltasController.listarTodos);

// Listar um estado de falta por IDs
router.get('/:id_estado/:id_falta', estadoFaltasController.listarPorIds);

// Criar um novo estado de falta
router.post('/create', estadoFaltasController.criar);

// Atualizar um estado de falta por IDs
router.put('/update/:id_estado/:id_falta', estadoFaltasController.atualizar);

// Eliminar um estado de falta por IDs
router.delete('/delete/:id_estado/:id_falta', estadoFaltasController.eliminar);

module.exports = router;
