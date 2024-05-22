const {Op, Sequelize} = require('sequelize');
const Compra = require('../compras/compra.sequelize');

async function getComprasByFornecedor(fromDate, toDate) {

    const compras = await Compra.findAll({
        where: {
            criado_em: {
                [Op.between]: [fromDate, toDate]
            }
        },
        attributes: [
            'id_fornecedor',
            'preco_arroba',
            [Sequelize.fn('count', Sequelize.col('*')), 'total_compras'],
            [Sequelize.literal('coalesce(sum(pesagens.peso), 0) / 15 * preco_arroba'), 'valor_total']
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

module.exports = {
    getComprasByFornecedor
};