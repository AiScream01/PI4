const express = require('express');
const router = express.Router();
const solicitacoesController = require('../controllers/solicitacoesController');

// Listar todas as solicitações
router.get('/', solicitacoesController.listarSolicitacoes);

// Adicionar uma nova solicitação
router.post('/add/:id', solicitacoesController.adicionarSolicitacao);

// Aceitar uma solicitação
router.put('/aceitar/:id', solicitacoesController.aceitarSolicitacao);

// Recusar uma solicitação
router.put('/recusar/:id', solicitacoesController.recusarSolicitacao);

module.exports = router;
