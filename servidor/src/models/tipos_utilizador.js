const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo TiposUtilizador
const TiposUtilizador = sequelize.define('TiposUtilizador', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tipos_utilizador',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = TiposUtilizador;
