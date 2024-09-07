const express = require('express');
const router = express.Router();
const multer = require('multer');
const despesasViaturaPessoalController = require('../controllers/despesasViaturaPessoalController');
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

// Listar todas as despesas de viatura pessoal
router.get('/', despesasViaturaPessoalController.listarTodos);

//LIstar todas as despesas pendentes
router.get('/pendentes', despesasViaturaPessoalController.listarPendentes);

// Listar uma despesa por ID
router.get('/:id', despesasViaturaPessoalController.listarPorId);

// Criar uma nova despesa
router.post('/create', upload.single('comprovativo'), despesasViaturaPessoalController.criar);

// Atualizar uma despesa por ID
router.put('/update/:id', upload.single('comprovativo'), despesasViaturaPessoalController.atualizar);

// Atualizar o estado de uma despesa por ID
router.put('/estado/:id_despesa', despesasViaturaPessoalController.atualizarEstado);

// Eliminar uma despesa por ID
router.delete('/delete/:id', despesasViaturaPessoalController.eliminar);

module.exports = router;
