const express = require('express');
const router = express.Router();
const protocolosParceriasController = require('../controllers/protocolosParceriasController');

// Listar todas as parcerias
router.get('/', protocolosParceriasController.listarTodos);

// Listar parceria por ID
router.get('/:id_parceria', protocolosParceriasController.listarPorId);

// Criar nova parceria
router.post('/create', protocolosParceriasController.criar);

// Atualizar parceria por ID
router.put('/update/:id_parceria', protocolosParceriasController.atualizar);

// Eliminar parceria por ID
router.delete('/delete/:id_parceria', protocolosParceriasController.eliminar);

module.exports = router;
