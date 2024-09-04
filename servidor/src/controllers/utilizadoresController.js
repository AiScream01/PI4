const Utilizadores = require("../models/utilizadores");
const bcrypt = require("bcryptjs"); // Importação do bcrypt para hash da palavra-passe
const jwt = require("jsonwebtoken");

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
    // Adicione log para ver o corpo da requisição
    console.log("Dados recebidos:", req.body);

    // Validar a entrada
    const { nome, email, role, palavrapasse } = req.body;
        
    if (!nome || !email || !palavrapasse) {
      return res.status(400).json({ error: 'Nome, email e palavrapasse são obrigatórios.' });
    }

    // Criptografa a senha usando bcrypt
    const hashedPassword = await bcrypt.hash(req.body.palavrapasse, 10);



    // Adicione log para verificar os dados antes de criar o utilizador
    console.log("Dados do utilizador a serem criados:", {nome, email, role});

    // Cria o utilizador no banco de dados
    const utilizadorData = await Utilizadores.create({
      nome,
      email,
      role,
      foto: req.file ? req.file.filename : null,
      palavrapasse: hashedPassword,
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
    // Verifica se a senha foi fornecida para atualização e a criptografa se necessário
    const updateData = { ...req.body };
    if (req.file) {
      updateData.foto = req.file.filename; 
    }
    
    if (updateData.palavrapasse) {
      updateData.palavrapasse = await bcrypt.hash(updateData.palavrapasse, 10);
    }

    const [updated] = await Utilizadores.update(updateData, {
      where: { id_user: req.params.id },
    });
    if (updated) {
      const updatedUtilizador = await Utilizadores.findByPk(req.params.id);
      res.json(updatedUtilizador);
    } else {
      res.status(404).json({ message: "Utilizador não encontrado" });
    }
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
exports.login = async (req, res) => {
  try {
    const { email, palavrapasse } = req.body;

    // Verifique se os campos obrigatórios estão presentes
    if (!email || !palavrapasse) {
      return res.status(400).json({ error: "Email e palavrapasse são obrigatórios!" });
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

    // Gera o token JWT com os dados do utilizador
    const token = jwt.sign(
      { id: user.id_user, email: user.email, role: user.role },
      "seuSegredoJWT", // Substitua por um segredo mais seguro em produção
      { expiresIn: "1h" }
    );

    // Retorna o token e informações adicionais do utilizador
    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      role: user.role,
      id: user.id_user,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
};
