const express = require('express');
const router = express.Router();
const ajudasCustoController = require('../controllers/ajudasCustoController');

// Listar todos os custos
router.get('/', ajudasCustoController.listarTodos);

// Listar um custo por ID
router.get('/:id', ajudasCustoController.listarPorId);

// Criar um novo custo
router.post('/create', ajudasCustoController.criar);

// Atualizar um custo por ID
router.put('/update/:id', ajudasCustoController.atualizar);

// Eliminar um custo por ID
router.delete('/delete/:id', ajudasCustoController.eliminar);

module.exports = router;
