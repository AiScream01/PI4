const { Sequelize } = require('sequelize');
// testing

const sequelize = new Sequelize(
    'pi4', //nome bd
    'postgres', //nome user
    '12345', //pp
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false,
    }
)

sequelize.sync()

module.exports = sequelize