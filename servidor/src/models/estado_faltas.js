const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoFaltas
const EstadoFaltas = sequelize.define('EstadoFaltas', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_falta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_faltas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoFaltas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo Faltas
const Faltas = require('./faltas'); // Certifique-se de ajustar o caminho conforme necessário
EstadoFaltas.belongsTo(Faltas, { foreignKey: 'id_falta' });

module.exports = EstadoFaltas;
