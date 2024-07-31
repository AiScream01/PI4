const express = require('express');
const router = express.Router();
const estadoAjudasController = require('../controllers/estadoAjudasController');

// Listar todos os estados de ajudas
router.get('/', estadoAjudasController.listarTodos);

// Listar um estado de ajuda por IDs
router.get('/:id_estado/:id_custo', estadoAjudasController.listarPorIds);

// Criar um novo estado de ajuda
router.post('/create', estadoAjudasController.criar);

// Atualizar um estado de ajuda por IDs
router.put('/update/:id_estado/:id_custo', estadoAjudasController.atualizar);

// Eliminar um estado de ajuda por IDs
router.delete('/delete/:id_estado/:id_custo', estadoAjudasController.eliminar);

module.exports = router;
