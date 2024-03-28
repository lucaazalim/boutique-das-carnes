const express = require('express');

const { httpGetAllComprasPagamentos, httpGetComprasPagamentosById, httpPostComprasPagamentos} = require('./compras-pagamentos.controller');

const comprasPagamentosRouter = express();

comprasPagamentosRouter.get('/',httpGetAllComprasPagamentos);
comprasPagamentosRouter.get('/:id', httpGetComprasPagamentosById);
comprasPagamentosRouter.post('/', httpPostComprasPagamentos);

module.exports = comprasPagamentosRouter;