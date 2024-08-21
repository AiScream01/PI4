const express = require('express');
const router = express.Router();
const horasController = require('../controllers/horasController');

// Listar todas as horas
router.get('/', horasController.listarTodos);

// Listar todas as horas
router.get('/pendentes', horasController.listarPendentes);

// Listar horas por ID
router.get('/:id_horas', horasController.listarPorId);

// Criar novas horas
router.post('/create', horasController.criar);

// Atualizar horas por ID
router.put('/update/:id_horas', horasController.atualizar);

// Atualizar estado das horas
router.put('/estado/update/:id_estado/:id_horas', horasController.atualizarEstadoHoras);

// Eliminar horas por ID
router.delete('/delete/:id_horas', horasController.eliminar);

module.exports = router;
