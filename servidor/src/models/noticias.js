const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Noticias
const Noticias = sequelize.define('Noticias', {
    id_noticia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imagem: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'noticias',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

module.exports = Noticias;
