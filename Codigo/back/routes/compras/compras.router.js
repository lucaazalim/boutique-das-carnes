const express = require('express');

const {
    httpGetAllComprasPagamentos,
    httpGetComprasPagamentosById,
    httpPostComprasPagamentos,
    httpPutCompraPagamentoById,
    httpPostManyComprasPagamentos
} = require('./compras-pagamentos/compras-pagamentos.controller');

const {
    httpGetAllComprasPesagens,
    httpGetComprasPesagensById,
    httpPostComprasPesagens,
    httpPutCompraPesagensById,
} = require('./compras-pesagens/compras-pesagens.controller');

const {
        httpGetAllCompras,
        httpGetCompraByID, 
        httpPostCompra,
        httpPutCompraById
} = require('./compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/pesagens/',httpGetAllComprasPesagens);
comprasRouter.get('/pesagens/:id', httpGetComprasPesagensById);
comprasRouter.post('/pesagens/', httpPostComprasPesagens);
comprasRouter.put('/:idCompra/pesagens/:id', httpPutCompraPesagensById);

comprasRouter.get('/pagamentos/',httpGetAllComprasPagamentos);
comprasRouter.get('/pagamentos/:id', httpGetComprasPagamentosById);
comprasRouter.post('/pagamentos/', httpPostComprasPagamentos);
comprasRouter.post('/:idCompra/pagamentos/', httpPostManyComprasPagamentos);
comprasRouter.put('/:idCompra/pagamentos/:id', httpPutCompraPagamentoById);

comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)
comprasRouter.put('/:id', httpPutCompraById);

module.exports = comprasRouter;