// models/ferias.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Utilizadores = require('./utilizadores'); // Ajuste o caminho conforme necessário

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
Ferias.belongsTo(Utilizadores, { foreignKey: 'id_user' });

// Associação com EstadoFerias
const EstadoFerias = require('./estado_ferias'); // Ajuste o caminho conforme necessário
Ferias.hasMany(EstadoFerias, { foreignKey: 'id_ferias' });

module.exports = Ferias;
