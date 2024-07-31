const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Listar todos os estados
router.get('/', estadoController.listarTodos);

// Listar um estado por ID
router.get('/:id_estado', estadoController.listarPorId);

// Criar um novo estado
router.post('/create', estadoController.criar);

// Atualizar um estado por ID
router.put('/update/:id_estado', estadoController.atualizar);

// Eliminar um estado por ID
router.delete('/delete/:id_estado', estadoController.eliminar);

module.exports = router;
