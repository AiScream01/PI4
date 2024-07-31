const express = require('express');
const router = express.Router();
const estadoDespesasController = require('../controllers/estadoDespesasController');

// Listar todos os estados de despesas
router.get('/', estadoDespesasController.listarTodos);

// Listar um estado de despesa por IDs
router.get('/:id_estado/:id_despesa', estadoDespesasController.listarPorIds);

// Criar um novo estado de despesa
router.post('/create', estadoDespesasController.criar);

// Atualizar um estado de despesa por IDs
router.put('/update/:id_estado/:id_despesa', estadoDespesasController.atualizar);

// Eliminar um estado de despesa por IDs
router.delete('/delete/:id_estado/:id_despesa', estadoDespesasController.eliminar);

module.exports = router;
