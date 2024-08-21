const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoFaltas
const EstadoFaltas = sequelize.define('EstadoFaltas', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_falta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_faltas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = EstadoFaltas;
