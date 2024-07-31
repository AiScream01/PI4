const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoHoras
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
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoHoras.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo Horas
const Horas = require('./horas'); // Certifique-se de ajustar o caminho conforme necessário
EstadoHoras.belongsTo(Horas, { foreignKey: 'id_horas' });

module.exports = EstadoHoras;
