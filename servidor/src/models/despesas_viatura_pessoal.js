const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de ajustar o caminho conforme necessário
const Utilizadores = require('./utilizadores');

// Defina o modelo DespesasViaturaPessoal
const DespesasViaturaPessoal = sequelize.define('DespesasViaturaPessoal', {
    id_despesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    km: {
        type: DataTypes.NUMERIC,
        allowNull: false
    },
    ponto_partida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ponto_chegada: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco_portagens: {
        type: DataTypes.NUMERIC,
        allowNull: false
    },
    comprovativo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'despesas_viatura_pessoal',
    timestamps: false // Para não adicionar colunas de timestamps automaticamente
});

// Defina o relacionamento com o modelo Utilizadores
DespesasViaturaPessoal.belongsTo(Utilizadores, { foreignKey: 'id_user', as: 'utilizador'  });

module.exports = DespesasViaturaPessoal;
