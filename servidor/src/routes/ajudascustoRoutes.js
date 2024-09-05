const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ajudasCustoController = require('../controllers/ajudasController');

// Configuração do multer para PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/')); // Mesmo destino das imagens
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

// Rota para listar todas as ajudas de custo
router.get('/', ajudasCustoController.listarTodos);

// Rota para listar ajudas de custo pendentes
router.get('/pendentes', ajudasCustoController.listarPendentes);

// Rota para listar ajudas de custo por ID
router.get('/:id_custo', ajudasCustoController.listarPorId);

// Rota para criar uma nova ajuda de custo com upload de PDF
router.post('/create', upload.single('comprovativo'), ajudasCustoController.criar);

// Rota para atualizar uma ajuda de custo por ID
router.put('/:id_custo', upload.single('comprovativo'), ajudasCustoController.atualizar);

// Rota para atualizar o estado de uma ajuda de custo por ID
router.put('/estado/:id_custo', ajudasCustoController.atualizarEstado);

// Rota para eliminar uma ajuda de custo por ID
router.delete('/:id_custo', ajudasCustoController.eliminar);

module.exports = router;
