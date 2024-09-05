const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ajudasCustoController = require('../controllers/ajudasController');

// Configuração de armazenamento para o multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Definir a pasta de destino dos arquivos carregados (imagens e PDFs)
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        // Nome do arquivo será gerado a partir da data atual para evitar colisões, mantendo a extensão original
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Função para filtrar apenas arquivos de imagem e PDF
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido. Apenas imagens e PDFs são permitidos.'));
    }
};

// Inicializa o multer com a configuração de armazenamento e filtro de arquivos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
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
