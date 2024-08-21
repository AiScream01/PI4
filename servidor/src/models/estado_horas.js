// models/estado_horas.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const EstadoHoras = sequelize.define('EstadoHoras', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_horas: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_horas',
    timestamps: false
});

module.exports = EstadoHoras;
