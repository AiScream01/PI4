const express = require('express');
const router = express.Router();
const multer = require('multer');
const protocolosParceriasController = require('../controllers/protocolosParceriasController');
const storage = require('../multer_config');

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Listar todas as parcerias
router.get('/', protocolosParceriasController.listarTodos);

// Listar parceria por ID
router.get('/:id_parceria', protocolosParceriasController.listarPorId);

// Criar nova parceria
router.post('/create', upload.single('logotipo'), protocolosParceriasController.criar);

// Atualizar parceria por ID
router.put('/update/:id_parceria', upload.single('logotipo'), protocolosParceriasController.atualizar);

// Eliminar parceria por ID
router.delete('/delete/:id_parceria', protocolosParceriasController.eliminar);

module.exports = router;
