// models/horas.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Utilizadores = require('./utilizadores'); // Certifique-se de que este é o caminho correto


const Horas = sequelize.define('Horas', {
    id_horas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'horas',
    timestamps: false
});

// Definir o relacionamento com Utilizadores
Horas.belongsTo(Utilizadores, { foreignKey: 'id_user', as: 'utilizador' });

module.exports = Horas;
