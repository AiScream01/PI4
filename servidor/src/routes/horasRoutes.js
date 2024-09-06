const express = require('express');
const router = express.Router();
const horasController = require('../controllers/horasController');

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
