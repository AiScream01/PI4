const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Logs
const Logs = sequelize.define('Logs', {
    id_log: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    acao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'logs',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = Logs;
