// models/estado.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Estado = sequelize.define('Estado', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'estado',
    timestamps: false
});

module.exports = Estado;
