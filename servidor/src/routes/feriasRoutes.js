const express = require('express');
const router = express.Router();
const feriasController = require('../controllers/feriasController');

// Listar todas as férias
router.get('/', feriasController.listarTodos);

// Listar todas as férias pendentes
router.get('/pendentes', feriasController.listarPendentes);

// Listar férias por ID
router.get('/:id_ferias', feriasController.listarPorId);

// Criar novas férias
router.post('/create', feriasController.criar);

// Atualizar férias por ID
router.put('/update/:id_ferias', feriasController.atualizar);

// Atualizar o estado das férias por ID
router.put('/estado/:id_ferias', feriasController.atualizarEstado);

// Eliminar férias por ID
router.delete('/delete/:id_ferias', feriasController.eliminar);

module.exports = router;
