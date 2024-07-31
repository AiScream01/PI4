const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

// Listar todas as notícias
router.get('/', noticiasController.listarTodos);

// Listar uma notícia por ID
router.get('/:id', noticiasController.listarPorId);

// Criar uma nova notícia
router.post('/create', noticiasController.criar);

// Atualizar uma notícia por ID
router.put('/update/:id', noticiasController.atualizar);

// Eliminar uma notícia por ID
router.delete('/delete/:id', noticiasController.eliminar);

module.exports = router;
