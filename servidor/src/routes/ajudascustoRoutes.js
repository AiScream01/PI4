const express = require('express');
const router = express.Router();
const ajudasCustoController = require('../controllers/ajudasController');

// Rota para listar todas as ajudas de custo
router.get('/', ajudasCustoController.listarTodos);

// Rota para listar ajudas de custo pendentes
router.get('/pendentes', ajudasCustoController.listarPendentes);

// Rota para listar ajudas de custo por ID
router.get('/:id_custo', ajudasCustoController.listarPorId);

// Rota para criar uma nova ajuda de custo
router.post('/create', ajudasCustoController.criar);

// Rota para atualizar uma ajuda de custo por ID
router.put('/:id_custo', ajudasCustoController.atualizar);

// Rota para atualizar o estado de uma ajuda de custo por ID
router.put('/estado/:id_custo', ajudasCustoController.atualizarEstado);

// Rota para eliminar uma ajuda de custo por ID
router.delete('/:id_custo', ajudasCustoController.eliminar);

module.exports = router;
