const express = require('express');
const router = express.Router();
const horasController = require('../controllers/horasController');

// Listar todas as horas
router.get('/', horasController.listarTodos);

// Listar horas por ID
router.get('/:id_horas', horasController.listarPorId);

// Criar novas horas
router.post('/create', horasController.criar);

// Atualizar horas por ID
router.put('/update/:id_horas', horasController.atualizar);

// Eliminar horas por ID
router.delete('/delete/:id_horas', horasController.eliminar);

module.exports = router;
