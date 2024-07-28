const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Estado
const Estado = sequelize.define('Estado', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'estado',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = Estado;

