const express = require('express');
const {
        httpGetAllCompras,
        httpGetCompraByID, 
        httpPostCompra
    } = require('./compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)

module.exports = comprasRouter;