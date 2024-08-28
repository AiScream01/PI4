const Sequelize = require("sequelize");
const sequelize = require("../models/database");

const appMobileController = {};

appMobileController.list = async (req, res) => {
  //************************************************************************************************************************************************************/
  //*******AQUI PAULA AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII PODES TESTAR NA NET COM O LINK https://pi4-api.onrender.com/appmobile/****/
  //**********************PENSO QUE O ERRO SEJA DOS TOKENS QUE A GENTE NÃO ESTÁ A USAR PQ EU FICO COM NÓ NA CABEÇA QUANDO TENTO*********************************/
  //******OBRIGADOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW*****/
  //************************************************************************************************************************************************************/
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
        horas.id_user = ${id_user_param}
      );`;
    const horas = await sequelize.query(query4, {
      type: Sequelize.QueryTypes.SELECT,
    });
    //
    //    // Consultar recibos de vencimento
    //    const query5 = `
    //    SELECT *
    //    FROM recibos_vencimento
    //    WHERE id_user = ${id_user_param}
    //    AND confirmacao_submissao_recibo = true;`;
    //    const recibos = await sequelize.query(query5, { type: Sequelize.QueryTypes.SELECT });
    //
    //    // Consultar despesas viatura própria
    //    const query6 = `
    //    SELECT
    //        despesas_viatura_propria.data_deslocacao,
    //        estados.tipo_estado
    //    FROM despesas_viatura_propria
    //    LEFT JOIN relacao_despesas_estado ON relacao_despesas_estado.id_despesa = despesas_viatura_propria.id_despesa
    //    LEFT JOIN estados ON relacao_despesas_estado.id_estado = estados.id_estado
    //    WHERE despesas_viatura_propria.id_user = ${id_user_param}
    //    AND relacao_despesas_estado.data_estado_despesas = (
    //        SELECT MAX(data_estado_despesas)
    //        FROM relacao_despesas_estado
    //        WHERE id_despesa = despesas_viatura_propria.id_despesa
    //    );`;
    //    const despesasViatura = await sequelize.query(query6, { type: Sequelize.QueryTypes.SELECT });
    //
    //    // Consultar faltas
    //    const query7 = `
    //    SELECT
    //        faltas.data_falta,
    //        estados.tipo_estado
    //    FROM faltas
    //    LEFT JOIN relacao_faltas_estado ON relacao_faltas_estado.id_falta = faltas.id_falta
    //    LEFT JOIN estados ON relacao_faltas_estado.id_estado = estados.id_estado
    //    WHERE faltas.id_user = ${id_user_param};`;
    //    const faltas = await sequelize.query(query7, { type: Sequelize.QueryTypes.SELECT });
    //
    //    // Consultar reuniões de RH
    //    const query8 = `
    //    SELECT
    //        reuniao_rh.*,
    //        pessoa_info_1.nome_utilizador AS nome_utilizador_1,
    //        tipo_utilizador_1.tipo AS tipo_utilizador_1,
    //        pessoa_info_2.nome_utilizador AS nome_utilizador_2,
    //        tipo_utilizador_2.tipo AS tipo_utilizador_2
    //    FROM reuniao_rh
    //    JOIN relacao_utilizadores_reuniao AS utilizador1 ON reuniao_rh.id_reuniao = utilizador1.id_reuniao
    //    JOIN utilizadores AS pessoa_info_1 ON utilizador1.id_user = pessoa_info_1.id_user
    //    JOIN tipo_utilizador AS tipo_utilizador_1 ON pessoa_info_1.id_tipo = tipo_utilizador_1.id_tipo
    //    JOIN relacao_utilizadores_reuniao AS utilizador2 ON reuniao_rh.id_reuniao = utilizador2.id_reuniao
    //    JOIN utilizadores AS pessoa_info_2 ON utilizador2.id_user = pessoa_info_2.id_user
    //    JOIN tipo_utilizador AS tipo_utilizador_2 ON pessoa_info_2.id_tipo = tipo_utilizador_2.id_tipo
    //    WHERE utilizador1.id_user = ${id_user_param} AND utilizador1.id_user < utilizador2.id_user;`;
    //    const reunioes = await sequelize.query(query8, { type: Sequelize.QueryTypes.SELECT });
    //
    res.json({
      success: true,
      utilizador: utilizador,
      ferias: ferias,
      ajudas: ajudas,
      //        horas: horas,
      //        recibos: recibos,
      //        despesasViatura: despesasViatura,
      //        faltas: faltas,
      //        reunioes: reunioes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

appMobileController.listNoticiasParcerias = async (req, res) => {
  try {
    // Seleciona todos os campos da tabela 'protocolos_parcerias'
    const queryParcerias = "SELECT * FROM protocolos_parcerias";
    const parcerias = await sequelize.query(queryParcerias, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Seleciona todos os campos da tabela 'noticias'
    const queryNoticias = "SELECT * FROM noticias";
    const noticias = await sequelize.query(queryNoticias, {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Retorna as informações obtidas em formato JSON
    res.json({ success: true, parcerias: parcerias, noticias: noticias });
  } catch (error) {
    // Em caso de erro, retorna o status 500 e a mensagem de erro
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = appMobileController;
