const express = require('express');
const relatoriosRouter = express.Router();

const {
    httpGetComprasPorFornecedor,
    httpGetLucroPorCompra,
    httpGetPedidosPorCliente
} = require('./relatorios.controller');

relatoriosRouter.get('/compras-por-fornecedor', httpGetComprasPorFornecedor);
relatoriosRouter.get('/lucro-por-compra', httpGetLucroPorCompra);
relatoriosRouter.get('/pedidos-por-cliente', httpGetPedidosPorCliente);

module.exports = relatoriosRouter;