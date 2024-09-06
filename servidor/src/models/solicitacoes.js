const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Solicitacoes = sequelize.define('Solicitacoes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dados: {
    type: DataTypes.JSONB, // Armazena os dados da solicitação como JSON
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendente'
  },
  data_solicitacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Solicitacoes;
