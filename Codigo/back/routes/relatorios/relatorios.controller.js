const {getComprasByFornecedor} = require("../../models/relatorios/relatorios.model");

async function httpGetComprasByFornecedor(req, res) {

    const fromDate = req.query.startOfDateRange ? req.query.startOfDateRange : new Date(0);
    const toDate = req.query.endOfDateRange ? req.query.endOfDateRange : new Date();

    try {
        const compras = await getComprasByFornecedor(fromDate, toDate);
        res.status(200).json(compras);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    httpGetComprasByFornecedor
};