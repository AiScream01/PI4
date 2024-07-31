const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo RecibosVencimento
const RecibosVencimento = sequelize.define('RecibosVencimento', {
    id_recibo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recibo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.CHAR(1),
        allowNull: false
    }
}, {
    tableName: 'recibos_vencimento',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário
RecibosVencimento.belongsTo(Utilizadores, { foreignKey: 'id_user' });

module.exports = RecibosVencimento;
