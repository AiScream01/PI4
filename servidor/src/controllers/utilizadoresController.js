const Utilizadores = require("../models/utilizadores");
const bcrypt = require("bcryptjs"); // Importação do bcrypt para hash da palavra-passe
const jwt = require("jsonwebtoken");
const Solicitacoes = require('../models/solicitacoes'); // Adicione esta linha para importar o modelo de solicitações

// Listar todos os utilizadores
exports.listarTodos = async (req, res) => {
  try {
    const utilizadores = await Utilizadores.findAll();
    res.json(utilizadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar um utilizador por ID
exports.listarPorId = async (req, res) => {
  try {
    const { id_user } = req.params;
    const utilizador = await Utilizadores.findByPk(req.params.id);
    if (utilizador) {
      res.json(utilizador);
    } else {
      res.status(404).json({ message: "Utilizador não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo utilizador
exports.criar = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);

    const { nome, email, role, palavrapasse } = req.body;

    if (!nome || !email || !palavrapasse) {
      return res.status(400).json({ error: 'Nome, email e palavrapasse são obrigatórios.' });
    }

    // Criptografar a palavra-passe
    const hashedPassword = await bcrypt.hash(palavrapasse, 10);

    const foto = req.files['foto'] ? req.files['foto'][0].filename : null;
    const declaracao_academica = req.files['declaracao_academica'] ? req.files['declaracao_academica'][0].filename : null;
    const declaracao_bancaria = req.files['declaracao_bancaria'] ? req.files['declaracao_bancaria'][0].filename : null;


    console.log("Arquivos recebidos:", { foto, declaracao_academica, declaracao_bancaria });

    // Cria o utilizador no banco de dados
    const utilizadorData = await Utilizadores.create({
      nome,
      email,
      role,
      palavrapasse: hashedPassword,
      foto,
      declaracao_academica,
      declaracao_bancaria
    });

    res.status(201).json(utilizadorData);
  } catch (error) {
    console.error("Erro ao criar utilizador:", error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um utilizador por ID
exports.atualizar = async (req, res) => {
  try {
    const updateData = { ...req.body };

    
    if (req.files['foto']) {
      updateData.foto = req.files['foto'][0].filename;
    }
    if (req.files['declaracao_academica']) {
      updateData.declaracao_academica = req.files['declaracao_academica'][0].filename;
    }
    if (req.files['declaracao_bancaria']) {
      updateData.declaracao_bancaria = req.files['declaracao_bancaria'][0].filename;
    }

    // Hash da palavrapasse, se fornecida
    if (updateData.palavrapasse) {
      updateData.palavrapasse = await bcrypt.hash(updateData.palavrapasse, 10);
    }

    // Verifica se há uma solicitação pendente
    const solicitacaoPendente = await Solicitacoes.findOne({
      where: { user_id: req.params.id, estado: 'pendente' }
    });

    if (solicitacaoPendente) {
      return res.status(400).json({ message: 'Há uma solicitação pendente para atualizar os dados deste utilizador.' });
    }

    // Cria uma nova solicitação de atualização
    const solicitacao = await Solicitacoes.create({
      user_id: req.params.id,
      dados: updateData,
      estado: 'pendente'
    });

    res.json({ message: 'Solicitação de atualização registrada com sucesso!', solicitacao });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Eliminar um utilizador por ID
exports.eliminar = async (req, res) => {
  try {
    const deleted = await Utilizadores.destroy({
      where: { id_user: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Utilizador não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de um utilizador
//exports.login = async (req, res) => {
//  try {
//    const { email, palavrapasse } = req.body;
//
//    // Verifique se os campos obrigatórios estão presentes
//    if (!email || !palavrapasse) {
//      return res.status(400).json({ error: "Email e palavrapasse são obrigatórios!" });
//    }
//
//    // Procura o utilizador pelo email
//    const user = await Utilizadores.findOne({ where: { email } });
//    if (!user) {
//      return res.status(401).json({ error: "Utilizador não encontrado" });
//    }
//
//    // Verifica se a senha fornecida corresponde ao hash armazenado
//    const senhaCorreta = await bcrypt.compare(palavrapasse, user.palavrapasse);
//    if (!senhaCorreta) {
//      return res.status(401).json({ error: "Credenciais inválidas" });
//    }
//
//    // Gera o token JWT com os dados do utilizador
//    const token = jwt.sign(
//      { id: user.id_user, email: user.email, role: user.role },
//      "seuSegredoJWT", // Substitua por um segredo mais seguro em produção
//      { expiresIn: "1h" }
//    );
//
//    // Retorna o token e informações adicionais do utilizador
//    res.status(200).json({
//      message: "Login bem-sucedido",
//      token,
//      role: user.role,
//      id: user.id_user,
//    });
//  } catch (error) {
//    console.error("Erro ao realizar login:", error);
//    res.status(500).json({ error: "Erro ao realizar login" });
//  }
//};

// Login de um utilizador
exports.login = async (req, res) => {
  try {
    const { email, palavrapasse } = req.body;

    // Verifique se os campos obrigatórios estão presentes
    if (!email || !palavrapasse) {
      return res.status(400).json({ error: "Email e senha são obrigatórios!" });
    }

    // Procura o utilizador pelo email
    const user = await Utilizadores.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Utilizador não encontrado" });
    }

    // Verifica se a senha fornecida corresponde ao hash armazenado
    const senhaCorreta = await bcrypt.compare(palavrapasse, user.palavrapasse);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Retorna o id do usuário e informações adicionais
    res.status(200).json({
      message: "Login bem-sucedido",
      id: user.id_user,  // Ajuste para corresponder ao campo retornado pelo Flutter
      role: user.role,
      nome: user.nome,
      foto: user.foto
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
};
