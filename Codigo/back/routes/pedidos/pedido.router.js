const express = require('express');
const pedidoRouter = express.Router();

const {
    httpGetAllPedido,
    httpGetByIdPedido,
    httpPostPedido,
    httpPutPedido,
    httpDeletePedido,
} = require('./pedido.controller');
const {
    httpGetByIdPedidoItem,
    httpGetByIdItem,
    httpPostItem,
    httpDeleteItem,
} = require('./item/item.controller');

pedidoRouter.get('/:id_pedido/itens', httpGetByIdPedidoItem);
pedidoRouter.get('/itens/:id', httpGetByIdItem);
pedidoRouter.post('/itens', httpPostItem);
pedidoRouter.delete('/itens/:id', httpDeleteItem);
pedidoRouter.get('/', httpGetAllPedido);
pedidoRouter.get('/:id', httpGetByIdPedido);
pedidoRouter.post('/', httpPostPedido);
pedidoRouter.put('/:id', httpPutPedido);
pedidoRouter.delete('/:id', httpDeletePedido);

module.exports = pedidoRouter;