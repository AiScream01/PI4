const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Utilizadores = require('./utilizadores');

const Ferias = sequelize.define('Ferias', {
    id_ferias: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ferias',
    timestamps: false
});

// Associação com Utilizadores
Ferias.belongsTo(Utilizadores, { foreignKey: 'id_user', as: 'utilizador' });

module.exports = Ferias;
