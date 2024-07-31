const express = require('express');
const router = express.Router();
const recibosVencimentoController = require('../controllers/recibosVencimentoController');

// Listar todos os recibos de vencimento
router.get('/', recibosVencimentoController.listarTodos);

// Listar recibo de vencimento por ID
router.get('/:id_recibo', recibosVencimentoController.listarPorId);

// Criar novo recibo de vencimento
router.post('/create', recibosVencimentoController.criar);

// Atualizar recibo de vencimento por ID
router.put('/update/:id_recibo', recibosVencimentoController.atualizar);

// Eliminar recibo de vencimento por ID
router.delete('/delete/:id_recibo', recibosVencimentoController.eliminar);

module.exports = router;
