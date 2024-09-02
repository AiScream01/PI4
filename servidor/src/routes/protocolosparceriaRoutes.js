const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protocolosParceriasController = require('../controllers/protocolosParceriasController');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // Correct the destination to always be 'src/uploads' relative to the project's root
      cb(null, path.join(__dirname, '..', 'uploads')); // Go up one directory from 'routes' and then into 'uploads'
  },
  filename: function (req, file, cb) {
      // Use Date.now() to generate a unique filename with the original file extension
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

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
