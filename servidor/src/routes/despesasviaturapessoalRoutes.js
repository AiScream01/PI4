const express = require('express');
const router = express.Router();
const despesasViaturaPessoalController = require('../controllers/despesasViaturaPessoalController');

// Listar todas as despesas de viatura pessoal
router.get('/', despesasViaturaPessoalController.listarTodos);

// Listar uma despesa por ID
router.get('/:id', despesasViaturaPessoalController.listarPorId);

// Criar uma nova despesa
router.post('/create', despesasViaturaPessoalController.criar);

// Atualizar uma despesa por ID
router.put('/update/:id', despesasViaturaPessoalController.atualizar);

// Eliminar uma despesa por ID
router.delete('/delete/:id', despesasViaturaPessoalController.eliminar);

module.exports = router;
