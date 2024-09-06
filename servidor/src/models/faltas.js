const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário

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
    },
    horas: {
        type: DataTypes.INTEGER, // Para armazenar o número de horas
        allowNull: true
    },
    justificacao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'faltas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
Faltas.belongsTo(Utilizadores, { foreignKey: 'id_user', as: 'utilizador' });

module.exports = Faltas;
