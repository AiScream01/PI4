const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoReuniao
const EstadoReuniao = sequelize.define('EstadoReuniao', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_reuniao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_reuniao',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = EstadoReuniao;
