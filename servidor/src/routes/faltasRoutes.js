const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const faltasController = require('../controllers/faltasController');

// Configuração do multer para PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); // Mesmo destino das imagens
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Gerar um nome único para o arquivo
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Permitir apenas PDFs
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Apenas ficheiros PDF são permitidos.'));
        }
    }
});

// Listar todas as faltas
router.get('/', faltasController.listarTodos);

// Listar todas as faltas
router.get('/pendentes', faltasController.listarPendentes);

// Listar uma falta por ID
router.get('/:id_falta', faltasController.listarPorId);

// Criar uma nova falta
router.post('/create', upload.single('justificacao'), faltasController.criar);

// Atualizar uma falta por ID
router.put('/update/:id_falta', upload.single('justificacao'), faltasController.atualizar);

// Atualizar o estado de uma falta por ID
router.put('/estado/:id_falta', faltasController.atualizarEstado);

// Eliminar uma falta por ID
router.delete('/delete/:id_falta', faltasController.eliminar);

module.exports = router;
