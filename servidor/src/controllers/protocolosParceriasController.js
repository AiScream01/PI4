const ProtocolosParcerias = require('../models/protocolos_parcerias');
const admin = require('../firebase.js'); // Importa o Firebase admin

// Listar todas as parcerias
exports.listarTodos = async (req, res) => {
    try {
        const parcerias = await ProtocolosParcerias.findAll();
        res.json(parcerias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar parceria por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_parceria } = req.params;
        const parceria = await ProtocolosParcerias.findByPk(id_parceria);
        if (parceria) {
            res.json(parceria);
        } else {
            res.status(404).json({ message: 'Parceria não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova parceria
exports.criar = async (req, res) => {
    try {
        const { titulo, descricao, categoria } = req.body;
        const parceria = await ProtocolosParcerias.create({
            titulo,
            descricao,
            categoria,
            logotipo: req.file ? req.file.filename : null,
        });

        // Definir a mensagem da notificação
        const message = {
            notification: {
                title: 'Nova Parceria',
                body: `Título: ${titulo} - Categoria: ${categoria} - ${descricao}`,
            },
            // Aqui você pode enviar para todos os dispositivos ou usar um tópico específico
            // Exemplo: topic: 'partnerships' se você estiver usando tópicos para notificações
            topic: 'all', // Enviar para todos os dispositivos inscritos no tópico 'all'
        };

        // Enviar a notificação através do Firebase Cloud Messaging
        admin.messaging().send(message)
            .then((response) => {
                console.log('Notificação enviada com sucesso:', response);
            })
            .catch((error) => {
                console.log('Erro ao enviar notificação:', error);
            });

        res.status(201).json(parceria);
    } catch (error) {
        console.error('Erro ao criar parceria:', error); // Log do erro para debug
        res.status(500).json({ error: error.message });
    }
};

// Atualizar parceria por ID
exports.atualizar = async (req, res) => {
    try {
        const { id_parceria } = req.params;
        if(req.file){
            req.body.logotipo = req.file.filename; 
        }
        const [updated] = await ProtocolosParcerias.update(req.body, {
            where: { id_parceria }
        });
        if (updated) {
            const updatedParceria = await ProtocolosParcerias.findByPk(id_parceria);
            res.status(201).json(updatedParceria);
        } else {
            res.status(404).json({ message: 'Parceria não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar parceria por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_parceria } = req.params;
        const deleted = await ProtocolosParcerias.destroy({
            where: { id_parceria }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Parceria não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
