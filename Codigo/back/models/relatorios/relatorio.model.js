const {Op, Sequelize} = require('sequelize');
const {sequelize} = require('../../services/mariadb.service');
const Compra = require('../compras/compra.sequelize');
const Pedido = require('../pedidos/pedido.sequelize');

async function getComprasPorFornecedor(fromDate, toDate) {

    const compras = await Compra.findAll({
        where: {
            data: {
                [Op.between]: [fromDate, toDate]
            }
        },
        attributes: [
            'id_fornecedor',
            'preco_arroba',
            [Sequelize.fn('count', Sequelize.col('*')), 'total_compras'],
            [Sequelize.literal('coalesce(sum(pesagens.peso), 0) / 30 * preco_arroba'), 'valor_total']
        ],
        group: ['id_fornecedor']
    });

    compras.forEach(fornecedor => {

        fornecedor = fornecedor.dataValues;

        delete fornecedor.preco_arroba;
        delete fornecedor.pagamentos;
        delete fornecedor.pesagens;
        delete fornecedor.carcacas;
        delete fornecedor.total_peso;

    });

    return compras;

}

async function getLucroPorCompra(fromDate, toDate) {

    const compras = sequelize.query(
        'SELECT * FROM relatorio_lucro_por_compra ' +
        'WHERE data BETWEEN :fromDate AND :toDate',
        {
            replacements: {
                fromDate,
                toDate
            },
            type: Sequelize.QueryTypes.SELECT
        }
    );

    return compras;

}

async function getPedidosPorCliente(fromDate, toDate) {

    const clientes = await Pedido.findAll({
        where: {
            data: {
                [Op.between]: [fromDate, toDate]
            }
        },
        attributes: [
            'id_cliente',
            [Sequelize.fn('count', Sequelize.col('*')), 'total_pedidos'],
            [Sequelize.literal('coalesce(sum(itens.valor_total), 0)'), 'valor_total']
        ],
        group: ['id_cliente']
    });

    return clientes;

}

module.exports = {
    getComprasPorFornecedor,
    getLucroPorCompra,
    getPedidosPorCliente
};