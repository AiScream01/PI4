// models/estado_ferias.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Estado = require('./estado'); // Ajuste o caminho conforme necessário
const Ferias = require('./ferias'); // Ajuste o caminho conforme necessário

const EstadoFerias = sequelize.define('EstadoFerias', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_ferias: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_ferias',
    timestamps: false
});

// Associação com Estado
EstadoFerias.belongsTo(Estado, { foreignKey: 'id_estado' });

module.exports = EstadoFerias;
