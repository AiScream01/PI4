const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoAjudas
const EstadoAjudas = sequelize.define('EstadoAjudas', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_custo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_ajudas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoAjudas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo AjudasCusto
const AjudasCusto = require('./ajudas_custo'); // Certifique-se de ajustar o caminho conforme necessário
EstadoAjudas.belongsTo(AjudasCusto, { foreignKey: 'id_custo' });

module.exports = EstadoAjudas;
