const { Sequelize } = require('sequelize');
// testing

const sequelize = new Sequelize(
    'pi4_bd_6p5h',                                  //'PI4', //nome bd
    'pi4_bd_6p5h_user',                             //'postgres', //nome user
    't9DWy47TCAWQNPj4yBC8zHDwBwBQmY3r',             //'postgres', //pp
    {
        host: 'dpg-cr69kmqj1k6c739e20mg-a.frankfurt-postgres.render.com',//'dpg-cr69kmqj1k6c739e20mg-a',
        port: 5432, // porta do banco de dados (opcional, padrão é 5432 para PostgreSQL)
        dialect: 'postgres', // dialecto do banco de dados
        logging: false, // desativar logs do Sequelize, se desejar
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Você pode definir como true se tiver um certificado CA válido
            }
        }
    }
                    //{
                    //    host: 'localhost',
                    //    port: 5432,
                    //    dialect: 'postgres',
                    //    logging: false,
                    //}
)

sequelize.sync()

module.exports = sequelize