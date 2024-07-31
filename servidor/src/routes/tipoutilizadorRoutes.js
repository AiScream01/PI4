const express = require('express');
const router = express.Router();
const tiposUtilizadorController = require('../controllers/tiposUtilizadorController');

// Listar todos os tipos de utilizador
router.get('/', tiposUtilizadorController.listarTodos);

// Listar tipo de utilizador por ID
router.get('/:id', tiposUtilizadorController.listarPorId);

// Criar novo tipo de utilizador
router.post('/create', tiposUtilizadorController.criar);

// Atualizar tipo de utilizador por ID
router.put('/update/:id', tiposUtilizadorController.atualizar);

// Eliminar tipo de utilizador por ID
router.delete('/delete/:id', tiposUtilizadorController.eliminar);

module.exports = router;
