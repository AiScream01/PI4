const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoReuniao
const EstadoReuniao = sequelize.define('EstadoReuniao', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_reuniao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_reuniao',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoReuniao.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo Reuniao
const Reuniao = require('./reuniao'); // Certifique-se de ajustar o caminho conforme necessário
EstadoReuniao.belongsTo(Reuniao, { foreignKey: 'id_reuniao' });

module.exports = EstadoReuniao;
