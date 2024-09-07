const express = require('express');
const router = express.Router();
const multer = require('multer');
const ajudasCustoController = require('../controllers/ajudasController');
const storage = require('../multer_config');

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
