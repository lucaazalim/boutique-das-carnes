const express = require('express');
const itemRouter = express.Router();

const {
    httpGetAllPedidoItem,
    httpGetByIdPedidoItem,
    httpPostPedidoItem,
    httpDeletePedidoItem,
} = require('./item.controller.js');

itemRouter.get('/', httpGetAllPedidoItem);
itemRouter.get('/:id', httpGetByIdPedidoItem);
itemRouter.post('/', httpPostPedidoItem);
itemRouter.delete('/:id', httpDeletePedidoItem);

module.exports = itemRouter;