const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Ajuste o caminho conforme necessário

const Utilizadores = sequelize.define('Utilizadores', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    palavrapasse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    declaracao_academica: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    declaracao_bancaria: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: { // Adiciona o campo role
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'utilizadores',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = Utilizadores;
