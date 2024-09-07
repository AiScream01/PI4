const Solicitacoes = require('../models/solicitacoes');
const Utilizadores = require('../models/utilizadores'); // Se ainda não foi importado
const bcrypt = require('bcryptjs');

exports.listarSolicitacoes = async (req, res) => {
  try {
    const solicitacoes = await Solicitacoes.findAll({
        where: {
          estado: 'pendente'
        },
        include: [{
            model: Utilizadores,
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

    const solicitacao = await Solicitacoes.create({
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
    const {id} = req.params;

    // Adicione logs para depuração
    console.log(`A procura de solicitação com ID: ${id}`);

    // Verifique se a solicitação existe
    const solicitacao = await Solicitacoes.findOne({ where: { id: id, estado: 'pendente' } });

    // Adicione logs para depuração
    console.log('Solicitação encontrada:', solicitacao);

    if (solicitacao) {
      await Utilizadores.update(solicitacao.dados, {
        where: { id_user: solicitacao.user_id } // Verifique se o campo correto está sendo utilizado
      });
      solicitacao.estado = 'aceito';
      await solicitacao.save();
      res.json({ message: 'Solicitação aceita com sucesso!' });
    } else {
      res.status(404).json({ message: 'Solicitação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao aceitar solicitação:', error); // Adicione logs para depuração
    res.status(500).json({ error: error.message });
  }
};

exports.recusarSolicitacao = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitacao = await Solicitacoes.findOne({ where: { user_id: id, estado: 'pendente' } });

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
