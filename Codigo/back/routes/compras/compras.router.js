const express = require('express');

const {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
    httpPutCompraById,
    httpDeleteCompraById
} = require('./compras.controller');

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
    httpPostCompraCarcaca,
    httpGetCompraCarcacaById,
    httpPutCompraCarcacaById,
    httpDeleteCompraCarcacaById
} = require('./compras-carcacas/compras-carcacas.controller');

const comprasRouter = express.Router();

comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)
comprasRouter.put('/:id', httpPutCompraById);
comprasRouter.delete('/:id', httpDeleteCompraById);

comprasRouter.get('/pesagens/:id', httpGetCompraPesagemById);
comprasRouter.post('/:id/pesagens', httpPostCompraPesagem);
comprasRouter.put('/pesagens/:id', httpPutCompraPesagemById);
comprasRouter.delete('/pesagens/:id', httpDeleteCompraPesagensById);

comprasRouter.get('/pagamentos/:id', httpGetCompraPagamentoById);
comprasRouter.post('/:id/pagamentos', httpPostCompraPagamento);
comprasRouter.put('/pagamentos/:id', httpPutCompraPagamentoById);
comprasRouter.delete('/pagamentos/:id', httpDeletePagamentoById);

comprasRouter.get('/carcacas/:id', httpGetCompraCarcacaById);
comprasRouter.post('/:id/carcacas', httpPostCompraCarcaca);
comprasRouter.put('/carcacas/:id', httpPutCompraCarcacaById);
comprasRouter.delete('/carcacas/:id', httpDeleteCompraCarcacaById);

module.exports = comprasRouter;