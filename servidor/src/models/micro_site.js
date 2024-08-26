const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Ajuste o caminho conforme necessário

// Defina o modelo Microsite
const Microsite = sequelize.define('Microsite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    link_google_play: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    link_app_store: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'microsite',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = Microsite;
