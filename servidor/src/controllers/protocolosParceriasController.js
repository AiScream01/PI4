const ProtocolosParcerias = require('../models/protocolos_parcerias');

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
        const { titulo, descricao, categoria, logotipo } = req.body;
        const parceria = await ProtocolosParcerias.create({
            titulo,
            descricao,
            categoria,
            logotipo
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
        const [updated] = await ProtocolosParcerias.update(req.body, {
            where: { id_parceria }
        });
        if (updated) {
            const updatedParceria = await ProtocolosParcerias.findByPk(id_parceria);
            res.json(updatedParceria);
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
