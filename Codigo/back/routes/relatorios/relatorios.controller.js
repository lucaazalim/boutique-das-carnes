const {
    getComprasPorFornecedor,
    getLucroPorCompra,
    getPedidosPorCliente
} = require("../../models/relatorios/relatorio.model");

async function httpGetComprasPorFornecedor(req, res) {

    const {fromDate, toDate} = getDateRange(req);

    try {
        const compras = await getComprasPorFornecedor(fromDate, toDate);
        res.status(200).json(compras);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function httpGetLucroPorCompra(req, res) {

    const {fromDate, toDate} = getDateRange(req);

    try {
        const compras = await getLucroPorCompra(fromDate, toDate);
        res.status(200).json(compras);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function httpGetPedidosPorCliente(req, res) {

    const {fromDate, toDate} = getDateRange(req);

    try {
        const pedidos = await getPedidosPorCliente(fromDate, toDate);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

function getDateRange(req) {
    const fromDate = req.query.fromDate ? req.query.fromDate : new Date(0);
    const toDate = req.query.toDate ? req.query.toDate : new Date();
    return {fromDate, toDate};
}

module.exports = {
    httpGetComprasPorFornecedor,
    httpGetLucroPorCompra,
    httpGetPedidosPorCliente
};