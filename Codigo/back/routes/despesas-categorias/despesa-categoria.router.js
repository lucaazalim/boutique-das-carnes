const express = require('express');

const {

    httpPostDespesasCategorias,
    httpGetAllDespesasCategorias,
    httpGetByIdDespesasCategorias,
    httpPutDespesasCategorias,
    httpDeleteDespesasCategorias

} = require('./despesa-categoria.controller')




const despesasCategoriasRouter = express.Router();

despesasCategoriasRouter.get('/', httpGetAllDespesasCategorias);
despesasCategoriasRouter.get('/:id', httpGetByIdDespesasCategorias);
despesasCategoriasRouter.post('/', httpPostDespesasCategorias);
despesasCategoriasRouter.put('/:id', httpPutDespesasCategorias);
despesasCategoriasRouter.delete('/:id', httpDeleteDespesasCategorias);

module.exports = despesasCategoriasRouter;