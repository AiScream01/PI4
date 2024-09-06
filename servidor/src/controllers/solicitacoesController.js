const Solicacoes = require('../models/solicitacoes');
const Utilizadores = require('../models/utilizadores'); // Se ainda não foi importado
const bcrypt = require('bcryptjs');

exports.listarSolicitacoes = async (req, res) => {
  try {
    const solicitacoes = await Solicitacoes.findAll({
        include: [{
            model: Utilizadores,
            as: 'utilizador', // O alias deve corresponder ao nome definido na associação
            attributes: ['nome', 'foto'] // Adicione os atributos que deseja buscar
        }]
    });
    res.json(solicitacoes);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

exports.adicionarSolicitacao = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.foto = req.file.filename;
    }

    if (updateData.palavrapasse) {
      updateData.palavrapasse = await bcrypt.hash(updateData.palavrapasse, 10);
    }

    const solicitacao = await Solicacoes.create({
      user_id: req.params.id,
      dados: updateData,
      estado: 'pendente'
    });

    res.json({ message: 'Solicitação registrada com sucesso!', solicitacao });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.aceitarSolicitacao = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitacao = await Solicacoes.findOne({ where: { user_id: id, estado: 'pendente' } });

    if (solicitacao) {
      await Utilizadores.update(solicitacao.dados, {
        where: { id_user: id }
      });
      solicitacao.estado = 'aceito';
      await solicitacao.save();
      res.json({ message: 'Solicitação aceita com sucesso!' });
    } else {
      res.status(404).json({ message: 'Solicitação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recusarSolicitacao = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitacao = await Solicacoes.findOne({ where: { user_id: id, estado: 'pendente' } });

    if (solicitacao) {
      solicitacao.estado = 'recusado';
      await solicitacao.save();
      res.json({ message: 'Solicitação recusada com sucesso!' });
    } else {
      res.status(404).json({ message: 'Solicitação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
