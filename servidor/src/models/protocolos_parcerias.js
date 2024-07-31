const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo ProtocolosParcerias
const ProtocolosParcerias = sequelize.define('ProtocolosParcerias', {
    id_parceria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logotipo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'protocolos_parcerias',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = ProtocolosParcerias;
