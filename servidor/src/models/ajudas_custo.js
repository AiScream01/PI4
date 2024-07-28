const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo AjudasCusto
const AjudasCusto = sequelize.define('AjudasCusto', {
    id_custo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    custo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comprovativo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ajudas_custo',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
const Utilizadores = require('./utilizadores'); // Certifique-se de ajustar o caminho conforme necessário
AjudasCusto.belongsTo(Utilizadores, { foreignKey: 'id_user' });

module.exports = AjudasCusto;
