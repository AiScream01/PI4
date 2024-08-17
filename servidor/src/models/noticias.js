const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Conexão com o banco de dados

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
        type: DataTypes.TEXT,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'noticias',
    timestamps: false
});

module.exports = Noticias;
