const Microsite = require('../models/micro_site');

// Listar um registro por ID
exports.listarPorId = async (req, res) => {
    try {
        const microsite = await Microsite.findByPk(req.params.id);
        if (microsite) {
            res.json(microsite);
        } else {
            res.status(404).json({ message: 'Registro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao listar o registro:', error);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um registro por ID
exports.atualizar = async (req, res) => {
    try {
        const [updated] = await Microsite.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMicrosite = await Microsite.findByPk(req.params.id);
            res.json(updatedMicrosite);
        } else {
            res.status(404).json({ message: 'Registro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o registro:', error);
        res.status(500).json({ error: error.message });
    }
};
