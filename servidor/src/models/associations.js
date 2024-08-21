const Horas = require('./horas');
const EstadoHoras = require('./estado_horas');

const Ajudas = require('./ajudas_custo');
const EstadoAjudas = require('./estado_ajudas');

const Faltas = require('./faltas');
const EstadoFaltas = require('./estado_faltas');

const Despesas = require('./despesas_viatura_pessoal');
const EstadoDespesas = require('./estado_despesas');

const Ferias = require('./ferias');
const EstadoFerias = require('./estado_ferias');

const Estado = require('./estado');

// Defina as associações
// Horas e EstadoHoras
Horas.hasMany(EstadoHoras, { foreignKey: 'id_horas' });
EstadoHoras.belongsTo(Horas, { foreignKey: 'id_horas' });

// Estado e EstadoHoras
Estado.hasMany(EstadoHoras, { foreignKey: 'id_estado' });
EstadoHoras.belongsTo(Estado, { foreignKey: 'id_estado' });

// Ajudas e EstadoAjudas
Ajudas.hasMany(EstadoAjudas, { foreignKey: 'id_custo' });
EstadoAjudas.belongsTo(Ajudas, { foreignKey: 'id_custo' });

// Estado e EstadoAjudas
Estado.hasMany(EstadoAjudas, { foreignKey: 'id_estado' });
EstadoAjudas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Faltas e EstadoFaltas
Faltas.hasMany(EstadoFaltas, { foreignKey: 'id_falta' });
EstadoFaltas.belongsTo(Faltas, { foreignKey: 'id_falta' });

// Estado e EstadoFaltas
Estado.hasMany(EstadoFaltas, { foreignKey: 'id_estado' });
EstadoFaltas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Despesas e EstadoDespesas
Despesas.hasMany(EstadoDespesas, { foreignKey: 'id_despesa' });
EstadoDespesas.belongsTo(Despesas, { foreignKey: 'id_despesa' });

// Estado e EstadoDespesas
Estado.hasMany(EstadoDespesas, { foreignKey: 'id_estado' });
EstadoDespesas.belongsTo(Estado, { foreignKey: 'id_estado' });

// Ferias e EstadoFerias
Ferias.hasMany(EstadoFerias, { foreignKey: 'id_ferias' });
EstadoFerias.belongsTo(Ferias, { foreignKey: 'id_ferias' });

// Estado e EstadoFerias
Estado.hasMany(EstadoFerias, { foreignKey: 'id_estado' });
EstadoFerias.belongsTo(Estado, { foreignKey: 'id_estado' });

module.exports = { Horas, EstadoHoras, Ajudas, EstadoAjudas, Estado, Faltas, EstadoFaltas, Despesas, EstadoDespesas, Ferias, EstadoFerias };
