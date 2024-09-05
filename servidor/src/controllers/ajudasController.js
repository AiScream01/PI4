const AjudasCusto = require('../models/ajudas_custo');
const Utilizadores = require('../models/utilizadores');
const EstadoAjudas = require('../models/estado_ajudas'); // Certifique-se de que o modelo existe
const Estado = require('../models/estado'); // Certifique-se de que o modelo existe
const admin = require('../firebase.js'); // Importa o Firebase admin

// Listar todas as ajudas de custo
exports.listarTodos = async (req, res) => {
    try {
        const ajudasCusto = await AjudasCusto.findAll({
            include: [
                {
                    model: Utilizadores,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });
        res.json(ajudasCusto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as ajudas de custo pendentes
exports.listarPendentes = async (req, res) => {
    try {
        // Primeiro, encontramos todos os IDs das ajudas de custo com estado pendente
        const ajudasCustoPendentesIds = await EstadoAjudas.findAll({
            where: { id_estado: 3 },
            attributes: ['id_custo'] // Retornamos apenas os IDs das ajudas de custo pendentes
        });

        // Se não houver ajudas de custo pendentes, retornamos uma lista vazia
        if (ajudasCustoPendentesIds.length === 0) {
            return res.json([]);
        }

        // Extraímos os IDs das ajudas de custo pendentes
        const ids = ajudasCustoPendentesIds.map(item => item.id_custo);

        // Encontramos as ajudas de custo com os IDs filtrados
        const ajudasCustoPendentes = await AjudasCusto.findAll({
            where: { id_custo: ids },
            include: [
                {
                    model: Utilizadores,
                    as: 'utilizador',
                    attributes: ['nome', 'foto']
                }
            ]
        });

        // Retornamos as ajudas de custo pendentes
        res.json(ajudasCustoPendentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Listar ajudas de custo por ID
exports.listarPorId = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const ajudaCusto = await AjudasCusto.findByPk(id_custo);
        if (ajudaCusto) {
            res.json(ajudaCusto);
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar nova ajuda de custo
exports.criar = async (req, res) => {
    try {
        // Extrair campos do corpo da requisição
        const { custo, descricao, id_user } = req.body;
        const comprovativo = req.file ? req.file.path : ''; // Caminho do arquivo PDF

        // Criar o registo de ajuda de custo na base de dados
        const ajudaCusto = await AjudasCusto.create({
            custo,
            descricao,
            comprovativo,
            id_user
        });

        // Criar o registo na tabela estado_ajudas_custo com id_estado 3
        await EstadoAjudas.create({
            id_custo: ajudaCusto.id_custo, // O id do registo de ajuda de custo recém-criado
            id_estado: 3 
        });

        // Responder com o objeto criado e status 201
        res.status(201).json(ajudaCusto);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao criar ajuda de custo:', error);

        res.status(500).json({ error: error.message });
    }
};


exports.atualizar = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.comprovativo = req.file.path;
        }

        const [updated] = await AjudasCusto.update(updateData, {
            where: { id_custo }
        });
        if (updated) {
            const updatedAjudaCusto = await AjudasCusto.findByPk(id_custo);
            res.json(updatedAjudaCusto);
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das ajudas de custo
exports.atualizarEstado = async (req, res) => {
    try {
        const { id_estado, id_custo } = req.params;
        const { novo_estado } = req.body;

        // Verifica se o estado e a ajuda de custo existem
        const estadoAjudas = await EstadoAjudas.findOne({ where: { id_estado, id_custo } });

        if (!estadoAjudas) {
            return res.status(404).json({ message: 'EstadoAjudas não encontrado' });
        }

        // Atualiza o estado
        const [updated] = await EstadoAjudas.update({ id_estado: novo_estado }, {
            where: { id_estado, id_custo }
        });

        if (updated) {
            const updatedEstadoAjudas = await EstadoAjudas.findOne({ where: { id_estado, id_custo } });
            res.json(updatedEstadoAjudas);
        } else {
            res.status(404).json({ message: 'Erro ao atualizar EstadoAjudas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar ajuda de custo por ID
exports.eliminar = async (req, res) => {
    try {
        const { id_custo } = req.params;
        const deleted = await AjudasCusto.destroy({
            where: { id_custo }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Ajuda de custo não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar estado das ajudas de custo por ID
exports.atualizarEstado = async (req, res) => {
    try {
      const { id_custo } = req.params;
      const { id_estado, fcmToken } = req.body; // fcmToken vem da app Flutter
  
      // Atualiza o estado da ajuda de custo com o novo id_estado
      const [updated] = await EstadoAjudas.update(
        { id_estado },
        { where: { id_custo } }
      );
  
      if (updated) {
        // Se a atualização for bem-sucedida, envia a push notification
        const message = {
          notification: {
            title: 'Estado Atualizado',
            body: `O estado da ajuda de custo ${id_custo} foi atualizado para ${id_estado}`,
          },
          token: fcmToken, // Token do dispositivo que irá receber a notificação
        };
  
        // Envia a notificação através do Firebase Cloud Messaging
        admin.messaging().send(message)
          .then((response) => {
            console.log('Notificação enviada com sucesso:', response);
          })
          .catch((error) => {
            console.log('Erro ao enviar notificação:', error);
          });
  
        // Resposta de sucesso
        res.json({ message: 'Estado atualizado e notificação enviada com sucesso' });
      } else {
        // Caso não encontre a ajuda de custo
        res.status(404).json({ message: 'Ajuda de custo não encontrada' });
      }
    } catch (error) {
      // Tratamento de erros
      res.status(500).json({ error: error.message });
    }
  };
