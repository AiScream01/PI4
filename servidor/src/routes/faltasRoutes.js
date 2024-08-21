const express = require('express');
const router = express.Router();
const faltasController = require('../controllers/faltasController');

// Listar todas as faltas
router.get('/', faltasController.listarTodos);

// Listar todas as faltas
router.get('/pendentes', faltasController.listarPendentes);

// Listar uma falta por ID
router.get('/:id_falta', faltasController.listarPorId);

// Criar uma nova falta
router.post('/create', faltasController.criar);

// Atualizar uma falta por ID
router.put('/update/:id_falta', faltasController.atualizar);

// Eliminar uma falta por ID
router.delete('/delete/:id_falta', faltasController.eliminar);

module.exports = router;
