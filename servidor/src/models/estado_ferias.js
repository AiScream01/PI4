const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoFerias
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
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoFerias.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo Ferias
const Ferias = require('./ferias'); // Certifique-se de ajustar o caminho conforme necessário
EstadoFerias.belongsTo(Ferias, { foreignKey: 'id_ferias' });

module.exports = EstadoFerias;
