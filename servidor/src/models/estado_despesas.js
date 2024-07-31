const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário

// Defina o modelo EstadoDespesas
const EstadoDespesas = sequelize.define('EstadoDespesas', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_despesa: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'estado_despesas',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Estado
const Estado = require('./estado'); // Certifique-se de ajustar o caminho conforme necessário
EstadoDespesas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Defina o relacionamento com o modelo DespesasViaturaPessoal
const DespesasViaturaPessoal = require('./despesas_viatura_pessoal'); // Certifique-se de ajustar o caminho conforme necessário
EstadoDespesas.belongsTo(DespesasViaturaPessoal, { foreignKey: 'id_despesa' });

module.exports = EstadoDespesas;
