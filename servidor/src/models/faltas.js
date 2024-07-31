const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Faltas
const Faltas = sequelize.define('Faltas', {
    id_falta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'faltas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário
Faltas.belongsTo(Utilizadores, { foreignKey: 'id_user' });

module.exports = Faltas;
