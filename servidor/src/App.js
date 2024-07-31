const express = require("express");
const path = require('path');
const app = express();
const sequelize = require('./models/database');



// Routes
const utilizadorRoutes = require('./routes/utilizadoresRoutes.js')
const tiposutilizadorRoutes = require('./routes/tipoutilizadorRoutes.js')
const reunioesutilizadoresRoutes = require('./routes/reunioesutilizadoresRoutes.js')
const reunioesRoutes = require('./routes/reunioesRoutes.js')
const recibosvencimentoRoutes = require('./routes/recibosvencimentoRoutes.js')
const protocolosparceriaRoutes = require('./routes/protocolosparceriaRoutes.js')
const noticiasRoute = require('./routes/noticiasRoutes.js')
const logsRoute = require('./routes/logsRoutes.js')
const feriasRoute = require('./routes/feriasRoutes.js')
const faltasRoute = require('./routes/faltasRoutes.js')
const estadosRoute = require('./routes/estadoRoutes.js')
const despesasviaturaRoute = require('./routes/despesasviaturapessoalRoutes.js')
const ajudascustoRoute = require('./routes/ajudascustoRoutes.js')


// Configurações
app.set("port", process.env.PORT || 3000);

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Middlewares
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Adicione esta linha para servir arquivos estáticos

// Rotas
app.use('/utilizador', utilizadorRoutes)
app.use('/tiposutilizador', tiposutilizadorRoutes)
app.use('/reunioesutilizadores', reunioesutilizadoresRoutes)
app.use('/reunioes', reunioesRoutes)
app.use('/recibovencimento', recibosvencimentoRoutes)
app.use('/protocolosparceria', protocolosparceriaRoutes)
app.use('/noicias', noticiasRoute)
app.use('/logs', logsRoute)
app.use('/ferias', feriasRoute)
app.use('/faltas', faltasRoute)
app.use('/estados', estadosRoute)
app.use('/despesasviatura', despesasviaturaRoute)
app.use('/ajudascusto', ajudascustoRoute)

// Sincronizar com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');

    // Onde o backend é ouvido
    app.listen(app.get('port'), () => {
        console.log("Start server on port " + app.get('port'))
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
