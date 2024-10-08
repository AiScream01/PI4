const express = require("express");
const path = require('path');
const app = express();
const sequelize = require('./models/database');
const cors = require('cors');

// Importa o arquivo de associações
require('./models/associations');

// Routes
//Soliciatações
const solicitacoesRoutes = require('./routes/solicitacoesRoutes'); // Certifique-se de que o caminho está correto

//APP mobile
const appMobileRoutes = require('./routes/appMobileRoutes.js')

//Utilizador
const utilizadorRoutes = require('./routes/utilizadoresRoutes.js')
//const tiposutilizadorRoutes = require('./routes/tipoutilizadorRoutes.js')

//horas
const horasRoute = require('./routes/horasRoutes.js')

//estado e estados
const estadosRoute = require('./routes/estadoRoutes.js')

//reuniões
const reunioesutilizadoresRoutes = require('./routes/reunioesutilizadoresRoutes.js')
const reunioesRoutes = require('./routes/reunioesRoutes.js')

//recibos de vencimento
const recibosvencimentoRoutes = require('./routes/recibosvencimentoRoutes.js')

//Parcerias
const protocolosparceriaRoutes = require('./routes/protocolosparceriaRoutes.js')

//Noticias
const noticiasRoute = require('./routes/noticiasRoutes.js')

//Logs
const logsRoute = require('./routes/logsRoutes.js')

//Ferias
const feriasRoute = require('./routes/feriasRoutes.js')

//Faltas
const faltasRoute = require('./routes/faltasRoutes.js')

//Despesas Viatura Própria
const despesasviaturaRoute = require('./routes/despesasviaturapessoalRoutes.js')

//Ajudas de custo
const ajudascustoRoute = require('./routes/ajudascustoRoutes.js')

//Micro-site
const micrositeRoute = require ('./routes/microSiteRoutes.js')



// Configurações
app.set("port", process.env.PORT || 3001);

// Configurar CORS
app.use(cors());

// Middlewares
app.use(express.json());
console.log(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/microsite', micrositeRoute)

// Rotas
app.use('/appmobile', appMobileRoutes)

//Solicitações para alterar perfil
app.use('/solicitacoes', solicitacoesRoutes); // A rota deve começar com /solicitacoes

app.use('/utilizador', utilizadorRoutes)
//app.use('/tiposutilizador', tiposutilizadorRoutes)
app.use('/reunioesutilizadores', reunioesutilizadoresRoutes)
app.use('/horas', horasRoute)
app.use('/reunioes', reunioesRoutes)
app.use('/recibovencimento', recibosvencimentoRoutes)
app.use('/protocolosparceria', protocolosparceriaRoutes)
app.use('/noticias', noticiasRoute)
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
