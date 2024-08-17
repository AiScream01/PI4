const { Sequelize } = require('sequelize');
// testing

const sequelize = new Sequelize(
    'PI4', //nome bd
    'postgres', //nome user
    'postgres', //pp
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false,
    }
)

sequelize.sync()

module.exports = sequelize