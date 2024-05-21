const express = require('express');
const pedidoRouter = express.Router();
const {
    httpGetAllPedido,
    httpGetByIdPedido,
    httpPostPedido,
    httpPutPedido,
    httpDeletePedido,
} = require('./pedido.controller');

pedidoRouter.get('/', httpGetAllPedido);
pedidoRouter.get('/:id', httpGetByIdPedido);
pedidoRouter.post('/', httpPostPedido);
pedidoRouter.put('/:id', httpPutPedido);
pedidoRouter.delete('/:id', httpDeletePedido);

module.exports = pedidoRouter;