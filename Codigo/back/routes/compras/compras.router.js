const express = require('express');

const {
    httpPostCompraPesagem,
    httpGetCompraPesagemById,
    httpPutCompraPesagemById,
    httpDeleteCompraPesagensById
} = require('./compras-pesagens/compras-pesagens.controller');

const {
    httpPostCompraPagamento,
    httpGetCompraPagamentoById,
    httpPutCompraPagamentoById,
    httpDeletePagamentoById
} = require('./compras-pagamentos/compras-pagamentos.controller');

const {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
    httpPutCompraById
} = require('./compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/pesagens/:id', httpGetCompraPesagemById);
comprasRouter.post('/:id/pesagens', httpPostCompraPesagem);
comprasRouter.put('/pesagens/:id', httpPutCompraPesagemById);
comprasRouter.delete('/pesagens/:id', httpDeleteCompraPesagensById);

comprasRouter.get('/pagamentos/:id', httpGetCompraPagamentoById);
comprasRouter.post('/:id/pagamentos', httpPostCompraPagamento);
comprasRouter.put('/pagamentos/:id', httpPutCompraPagamentoById);
comprasRouter.delete('/pagamentos/:id', httpDeletePagamentoById);

comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)
comprasRouter.put('/:id', httpPutCompraById);

module.exports = comprasRouter;