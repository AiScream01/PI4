const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo ReunioesUtilizadores
const ReunioesUtilizadores = sequelize.define('ReunioesUtilizadores', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_reuniao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'reunioes_utilizadores',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = ReunioesUtilizadores;
