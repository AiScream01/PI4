const express = require('express');
const router = express.Router();
const micrositeController = require('../controllers/micrositeController'); // Ajuste o caminho conforme necessário

// Listar um registro por ID
router.get('/:id', micrositeController.listarPorId);

// Atualizar um registro por ID
router.put('/update/:id', micrositeController.atualizar);

module.exports = router;
