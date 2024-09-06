const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Reunioes
const Reunioes = sequelize.define('Reunioes', {
    id_reuniao: {
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
        allowNull: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME, // Tipo para armazenar a hora da reunião
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reunioes',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores

Reunioes.belongsTo(Utilizadores, { foreignKey: 'id_user', as: 'utilizador' });

module.exports = Reunioes;
