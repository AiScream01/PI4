const express = require('express');
const router = express.Router();
const estadoHorasController = require('../controllers/estadoHorasController');

// Listar todos os estados de horas
router.get('/', estadoHorasController.listarTodos);

// Listar um estado de horas por IDs
router.get('/:id_estado/:id_horas', estadoHorasController.listarPorIds);

// Criar um novo estado de horas
router.post('/create', estadoHorasController.criar);

// Atualizar um estado de horas por IDs
router.put('/update/:id_estado/:id_horas', estadoHorasController.atualizar);

// Eliminar um estado de horas por IDs
router.delete('/delete/:id_estado/:id_horas', estadoHorasController.eliminar);

module.exports = router;
