const express = require('express');
const router = express.Router();
const estadoReuniaoController = require('../controllers/estadoReuniaoController');

// Listar todos os estados de reunião
router.get('/', estadoReuniaoController.listarTodos);

// Listar um estado de reunião por IDs
router.get('/:id_estado/:id_reuniao', estadoReuniaoController.listarPorIds);

// Criar um novo estado de reunião
router.post('/create', estadoReuniaoController.criar);

// Atualizar um estado de reunião por IDs
router.put('/update/:id_estado/:id_reuniao', estadoReuniaoController.atualizar);

// Eliminar um estado de reunião por IDs
router.delete('/delete/:id_estado/:id_reuniao', estadoReuniaoController.eliminar);

module.exports = router;
