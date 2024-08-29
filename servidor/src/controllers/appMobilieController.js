const Sequelize = require("sequelize");
const sequelize = require("../models/database");


exports.list = async (req, res) => {
  const id_user_param = req.params.userId; // Pegando o ID do utilizador

  console.log("ID User:", id_user_param); // Adiciona este log para ver o valor

  try {
    // Consultar dados do utilizador
    const query1 = `SELECT * FROM utilizadores WHERE id_user = ${id_user_param}`;
    const utilizador = await sequelize.query(query1, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Consulta SQL FERIAS
    const query2 = `
    SELECT 
        ferias.data_inicio,
        ferias.data_fim,
        estado.estado
    FROM
        ferias
    JOIN
        estado_ferias ON ferias.id_ferias = estado_ferias.id_ferias
    JOIN
        estado ON estado_ferias.id_estado = estado.id_estado
    WHERE
    ferias.id_user = ${id_user_param};
        `;
    const ferias = await sequelize.query(query2, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Consulta SQL Ajudas Custo
    const query3 = `
    SELECT
        ajudas_custo.custo,
        ajudas_custo.id_custo,
        ajudas_custo.custo,
        ajudas_custo.descricao,
        ajudas_custo.comprovativo,
        estado.estado
   FROM 
      ajudas_custo
   JOIN 
      estado_ajudas ON ajudas_custo.id_custo = estado_ajudas.id_custo
  JOIN 
      estado ON estado_ajudas.id_estado = estado.id_estado
   WHERE 
   ajudas_custo.id_user = ${id_user_param};`;

    const ajudas = await sequelize.query(query3, {
      type: Sequelize.QueryTypes.SELECT,
    });


    // Consultar SQL Horas
    const query4 = `
     SELECT
          horas.id_horas,
          horas.horas,
          estado.estado

      FROM 
          horas
      JOIN 
          estado_horas ON horas.id_horas = estado_horas.id_horas
      JOIN 
          estado ON estado_horas.id_estado = estado.id_estado
        WHERE 
        horas.id_user = ${id_user_param};`;
    const horas = await sequelize.query(query4, {
      type: Sequelize.QueryTypes.SELECT,
    });

    //Consultar recibos de vencimento
    /*const query5 = `
    SELECT 
        recibos_vencimento.
    FROM recibos_vencimento
    WHERE id_user = ${id_user_param}
    AND confirmacao_submissao_recibo = true;`;
    const recibos = await sequelize.query(query5, { type: Sequelize.QueryTypes.SELECT });*/

    // Consultar despesas viatura pessoal
    const query6 = `
    SELECT
        despesas_viatura_pessoal.id_despesa,
        despesas_viatura_pessoal.ponto_partida,
        despesas_viatura_pessoal.ponto_chegada,
        despesas_viatura_pessoal.km,
        despesas_viatura_pessoal.comprovativo,
        despesas_viatura_pessoal.preco_portagens,
        estado.estado
    FROM 
        despesas_viatura_pessoal
    JOIN 
        estado_despesas ON despesas_viatura_pessoal.id_despesa = despesas_viatura_pessoal.id_despesa
    JOIN 
        estado ON estado_despesas.id_estado = estado.id_estado
    WHERE 
    despesas_viatura_pessoal.id_user = ${id_user_param};`;
    const despesasViatura = await sequelize.query(query6, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Consultar faltas
    const query7 = `
    SELECT
        faltas.data,
        faltas.id_falta,
        estado.estado
    FROM 
        faltas
    JOIN 
        estado_faltas ON faltas.id_falta = faltas.id_falta
    JOIN 
        estado ON estado_faltas.id_estado = estado.id_estado
    WHERE 
    faltas.id_user = ${id_user_param};`;
    const faltas = await sequelize.query(query7, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Consultar reuniões
    const query8 = `
    SELECT
        reunioes.id_reuniao,
        reunioes.titulo,
        reunioes.descricao,
        reunioes.data,
        estado.estado
    FROM 
        reunioes
    JOIN 
        estado_reuniao ON reunioes.id_reuniao = reunioes.id_reuniao
    JOIN 
        estado ON estado_reuniao.id_reuniao = estado.id_estado
    WHERE 
    reunioes.id_user = ${id_user_param};`;
    const reunioes = await sequelize.query(query8, {
      type: Sequelize.QueryTypes.SELECT,
    });

    //
    res.json({
      success: true,
      utilizador: utilizador,
      ferias: ferias,
      ajudas: ajudas,
      horas: horas,
      //recibos: recibos,
      despesasViatura: despesasViatura,
      faltas: faltas,
      reunioes: reunioes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const { QueryTypes } = require('sequelize'); // Ensure to import QueryTypes from sequelize

exports.listNoticiasParcerias = async (req, res) => {
  try {
    console.log("Starting listNoticiasParcerias...");

    // Assume that 'id_user_param' might be a parameter you want to filter with; modify as needed.
    const id_user_param = req.params.userId;

    // Query for 'protocolos_parcerias' table
    const queryParcerias = `
      SELECT 
        protocolos_parcerias.id_parceria,
        protocolos_parcerias.logotipo,
        protocolos_parcerias.titulo,
        protocolos_parcerias.descricao,
        protocolos_parcerias.categoria
      FROM 
        protocolos_parcerias;
    `;

    console.log('Executing query for parcerias:', queryParcerias);

    const parcerias = await sequelize.query(queryParcerias, {
      type: QueryTypes.SELECT,
    });

    console.log(`Fetched ${parcerias.length} records from protocolos_parcerias`);

    // Query for 'noticias' table
    const queryNoticias = `
      SELECT 
        noticias.id_noticia,
        noticias.titulo,
        noticias.descricao,
        noticias.data,
        noticias.imagem
      FROM 
        noticias;
    `;

    console.log('Executing query for noticias:', queryNoticias);

    const noticias = await sequelize.query(queryNoticias, {
      type: QueryTypes.SELECT,
    });

    console.log(`Fetched ${noticias.length} records from noticias`);

    // Return fetched data
    res.json({ success: true, parcerias: parcerias, noticias: noticias });

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
