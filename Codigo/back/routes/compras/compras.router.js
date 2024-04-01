const express = require('express');

const {
    httpGetAllComprasPagamentos,
    httpGetComprasPagamentosById,
    httpPostComprasPagamentos,
    httpPutCompraPagamentoById,
    httpPostManyComprasPagamentos,
    httpDeletePagamentoById
} = require('./compras-pagamentos/compras-pagamentos.controller');

const {
    httpGetAllComprasPesagens,
    httpGetComprasPesagensById,
    httpPostComprasPesagens,
    httpPutCompraPesagensById,
    httpPostManyCompraPesagens,
    httpDeleteCompraPesagensById
} = require('./compras-pesagens/compras-pesagens.controller');

const {
        httpGetAllCompras,
        httpGetCompraByID, 
        httpPostCompra,
        httpPutCompraById
} = require('./compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/pesagens/:id', httpGetComprasPesagensById);
comprasRouter.post('/:idCompra/pesagens', httpPostManyCompraPesagens);
comprasRouter.put('/pesagens/:id', httpPutCompraPesagensById);
comprasRouter.delete('/pesagens/:id', httpDeleteCompraPesagensById);
//comprasRouter.post('/pesagens', httpPostComprasPesagens);

comprasRouter.get('/pagamentos/:id', httpGetComprasPagamentosById);
comprasRouter.post('/:idCompra/pagamentos', httpPostManyComprasPagamentos);
comprasRouter.put('/pagamentos/:id', httpPutCompraPagamentoById);
comprasRouter.delete('/pagamentos/:id', httpDeletePagamentoById);
//comprasRouter.post('/pagamentos', httpPostComprasPagamentos);


comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)
comprasRouter.put('/:id', httpPutCompraById);

module.exports = comprasRouter;