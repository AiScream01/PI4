const express = require('express');
const router = express.Router();
const estadoFeriasController = require('../controllers/estadoFeriasController');

// Listar todos os estados de férias
router.get('/', estadoFeriasController.listarTodos);

// Listar um estado de férias por IDs
router.get('/:id_estado/:id_ferias', estadoFeriasController.listarPorIds);

// Criar um novo estado de férias
router.post('/create', estadoFeriasController.criar);

// Atualizar um estado de férias por IDs
router.put('/update/:id_estado/:id_ferias', estadoFeriasController.atualizar);

// Eliminar um estado de férias por IDs
router.delete('/delete/:id_estado/:id_ferias', estadoFeriasController.eliminar);

module.exports = router;
