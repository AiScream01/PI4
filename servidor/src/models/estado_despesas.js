const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoDespesas
const EstadoDespesas = sequelize.define('EstadoDespesas', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_despesa: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_despesas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = EstadoDespesas;
