const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Utilizadores
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
    id_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'utilizadores',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo TiposUtilizador
const TiposUtilizador = require('./tipos_utilizador'); // Certifique-se de ajustar o caminho conforme necessário
Utilizadores.belongsTo(TiposUtilizador, { foreignKey: 'id_tipo' });

module.exports = Utilizadores;
