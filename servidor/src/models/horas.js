const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo Horas
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
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário
Horas.belongsTo(Utilizadores, { foreignKey: 'id_user' });

module.exports = Horas;
