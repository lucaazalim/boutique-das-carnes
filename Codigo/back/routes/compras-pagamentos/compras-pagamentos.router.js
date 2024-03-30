const express = require('express');

const { httpGetAllComprasPagamentos, httpGetComprasPagamentosById, httpPostComprasPagamentos, httpPutCompraById} = require('./compras-pagamentos.controller');

const comprasPagamentosRouter = express();

comprasPagamentosRouter.get('/',httpGetAllComprasPagamentos);
comprasPagamentosRouter.get('/:id', httpGetComprasPagamentosById);
comprasPagamentosRouter.post('/', httpPostComprasPagamentos);
comprasPagamentosRouter.put('/:id', httpPutCompraById);

module.exports = comprasPagamentosRouter;