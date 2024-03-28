const express = require('express');
const {
        httpGetAllCompras,
        httpGetCompraByID, 
        httpPostCompra,
        httpPutCompraById
    } = require('./compras.controller');

const comprasRouter = express.Router();

comprasRouter.get('/', httpGetAllCompras);
comprasRouter.get('/:id', httpGetCompraByID);
comprasRouter.post('/', httpPostCompra)
comprasRouter.put('/:id', httpPutCompraById);

module.exports = comprasRouter;