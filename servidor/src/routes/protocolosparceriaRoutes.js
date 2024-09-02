const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protocolosParceriasController = require('../controllers/protocolosParceriasController');

// Configuração do multer para armazenar os arquivos no diretório 'src/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });


const upload = multer({ storage: storage });

// Listar todas as parcerias
router.get('/', protocolosParceriasController.listarTodos);

// Listar parceria por ID
router.get('/:id_parceria', protocolosParceriasController.listarPorId);

// Criar nova parceria
router.post('/create', upload.single('logotipo'), protocolosParceriasController.criar);

// Atualizar parceria por ID
router.put('/update/:id_parceria', protocolosParceriasController.atualizar);

// Eliminar parceria por ID
router.delete('/delete/:id_parceria', protocolosParceriasController.eliminar);

module.exports = router;
