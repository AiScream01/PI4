const express = require('express');
const router = express.Router();
const multer = require('multer');
const horasController = require('../controllers/horasController');
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

// Listar todas as horas
router.get('/', horasController.listarTodos);

// Listar todas as horas pendentes
router.get('/pendentes', horasController.listarPendentes);

// Listar horas por ID
router.get('/:id_horas', horasController.listarPorId);

// Criar novas horas
router.post('/create', upload.single('comprovativo'), horasController.criar);

// Atualizar horas por ID
router.put('/update/:id_horas', upload.single('comprovativo'),horasController.atualizar);

// Atualizar o estado das horas por ID
router.put('/estado/:id_horas', horasController.atualizarEstadoHoras);

// Eliminar horas por ID
router.delete('/delete/:id_horas', horasController.eliminar);

module.exports = router;
