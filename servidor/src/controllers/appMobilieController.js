const Sequelize = require('sequelize');
const sequelize = require('../models/database');

const appMobileController = {};

appMobileController.list = async (req, res) => {
    const id_utilizador_param = req.userId; // Pegando o ID do utilizador

    try {
        // Consultar dados do utilizador
        const query1 = `SELECT * FROM utilizadores WHERE id_utilizador = ${id_utilizador_param}`;
        const utilizador = await sequelize.query(query1, { type: Sequelize.QueryTypes.SELECT });

        // Consultar férias
        const query2 = `
        SELECT
            ferias.data_comeco,
            ferias.data_fim,
            estados.tipo_estado
        FROM ferias
        LEFT JOIN relacao_ferias_estado ON relacao_ferias_estado.id_ferias = ferias.id_ferias
        LEFT JOIN estados ON relacao_ferias_estado.id_estado = estados.id_estado
        WHERE ferias.id_utilizador = ${id_utilizador_param}
        AND relacao_ferias_estado.data_estado_ferias = (
            SELECT MAX(data_estado_ferias)
            FROM relacao_ferias_estado
            WHERE id_ferias = ferias.id_ferias
        );`;
        const ferias = await sequelize.query(query2, { type: Sequelize.QueryTypes.SELECT });

        // Consultar ajudas de custo
        const query3 = `
        SELECT
            ajudas_custo.valor_ajuda,
            estados.tipo_estado
        FROM ajudas_custo
        LEFT JOIN relacao_ajudas_estado ON relacao_ajudas_estado.id_ajuda_custo = ajudas_custo.id_ajuda_custo
        LEFT JOIN estados ON relacao_ajudas_estado.id_estado = estados.id_estado
        WHERE ajudas_custo.id_utilizador = ${id_utilizador_param}
        AND relacao_ajudas_estado.data_estado_ajudascusto = (
            SELECT MAX(data_estado_ajudascusto)
            FROM relacao_ajudas_estado
            WHERE id_ajuda_custo = ajudas_custo.id_ajuda_custo
        );`;
        const ajudas = await sequelize.query(query3, { type: Sequelize.QueryTypes.SELECT });

        // Consultar horas
        const query4 = `
        SELECT
            relatorio_horas.mes,
            estados.tipo_estado
        FROM relatorio_horas
        LEFT JOIN relacao_horas_estado ON relacao_horas_estado.id_relatorio_horas = relatorio_horas.id_relatorio_horas
        LEFT JOIN estados ON relacao_horas_estado.id_estado = estados.id_estado
        WHERE relatorio_horas.id_utilizador = ${id_utilizador_param}
        AND relacao_horas_estado.data_estado_relatorio_horas = (
            SELECT MAX(data_estado_relatorio_horas)
            FROM relacao_horas_estado
            WHERE id_relatorio_horas = relatorio_horas.id_relatorio_horas
        );`;
        const horas = await sequelize.query(query4, { type: Sequelize.QueryTypes.SELECT });

        // Consultar recibos de vencimento
        const query5 = `
        SELECT *
        FROM recibos_vencimento
        WHERE id_utilizador = ${id_utilizador_param} 
        AND confirmacao_submissao_recibo = true;`;
        const recibos = await sequelize.query(query5, { type: Sequelize.QueryTypes.SELECT });

        // Consultar despesas viatura própria
        const query6 = `
        SELECT
            despesas_viatura_propria.data_deslocacao,
            estados.tipo_estado
        FROM despesas_viatura_propria
        LEFT JOIN relacao_despesas_estado ON relacao_despesas_estado.id_despesa = despesas_viatura_propria.id_despesa
        LEFT JOIN estados ON relacao_despesas_estado.id_estado = estados.id_estado
        WHERE despesas_viatura_propria.id_utilizador = ${id_utilizador_param}
        AND relacao_despesas_estado.data_estado_despesas = (
            SELECT MAX(data_estado_despesas)
            FROM relacao_despesas_estado
            WHERE id_despesa = despesas_viatura_propria.id_despesa
        );`;
        const despesasViatura = await sequelize.query(query6, { type: Sequelize.QueryTypes.SELECT });

        // Consultar faltas
        const query7 = `
        SELECT
            faltas.data_falta,
            estados.tipo_estado
        FROM faltas
        LEFT JOIN relacao_faltas_estado ON relacao_faltas_estado.id_falta = faltas.id_falta
        LEFT JOIN estados ON relacao_faltas_estado.id_estado = estados.id_estado
        WHERE faltas.id_utilizador = ${id_utilizador_param};`;
        const faltas = await sequelize.query(query7, { type: Sequelize.QueryTypes.SELECT });

        // Consultar reuniões de RH
        const query8 = `
        SELECT
            reuniao_rh.*,
            pessoa_info_1.nome_utilizador AS nome_utilizador_1,
            tipo_utilizador_1.tipo AS tipo_utilizador_1,
            pessoa_info_2.nome_utilizador AS nome_utilizador_2,
            tipo_utilizador_2.tipo AS tipo_utilizador_2
        FROM reuniao_rh
        JOIN relacao_utilizadores_reuniao AS utilizador1 ON reuniao_rh.id_reuniao = utilizador1.id_reuniao
        JOIN utilizadores AS pessoa_info_1 ON utilizador1.id_utilizador = pessoa_info_1.id_utilizador
        JOIN tipo_utilizador AS tipo_utilizador_1 ON pessoa_info_1.id_tipo = tipo_utilizador_1.id_tipo
        JOIN relacao_utilizadores_reuniao AS utilizador2 ON reuniao_rh.id_reuniao = utilizador2.id_reuniao
        JOIN utilizadores AS pessoa_info_2 ON utilizador2.id_utilizador = pessoa_info_2.id_utilizador
        JOIN tipo_utilizador AS tipo_utilizador_2 ON pessoa_info_2.id_tipo = tipo_utilizador_2.id_tipo
        WHERE utilizador1.id_utilizador = ${id_utilizador_param} AND utilizador1.id_utilizador < utilizador2.id_utilizador;`;
        const reunioes = await sequelize.query(query8, { type: Sequelize.QueryTypes.SELECT });

        res.json({
            success: true,
            utilizador: utilizador,
            ferias: ferias,
            ajudas: ajudas,
            horas: horas,
            recibos: recibos,
            despesasViatura: despesasViatura,
            faltas: faltas,
            reunioes: reunioes
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

appMobileController.listNoticiasParcerias = async (req, res) => {
    try {
        // Seleciona todos os campos da tabela 'protocolos_parcerias'
        const queryParcerias = 'SELECT * FROM protocolos_parcerias';
        const parcerias = await sequelize.query(queryParcerias, { type: Sequelize.QueryTypes.SELECT });

        // Seleciona todos os campos da tabela 'noticias'
        const queryNoticias = 'SELECT * FROM noticias';
        const noticias = await sequelize.query(queryNoticias, { type: Sequelize.QueryTypes.SELECT });

        // Retorna as informações obtidas em formato JSON
        res.json({ success: true, parcerias: parcerias, noticias: noticias });
    } catch (error) {
        // Em caso de erro, retorna o status 500 e a mensagem de erro
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = appMobileController;
