const express = require('express');

const {
    httpPostDespesas,
    httpGetAllDespesas,
    httpGetByIdDepesas,
    httpPutDespesas,
    httpDeleteDespesa
} = require('./despesa.controller');

const despesasRouter = express.Router();

despesasRouter.get('/', httpGetAllDespesas);
despesasRouter.get('/:id', httpGetByIdDepesas);
despesasRouter.post('/', httpPostDespesas);
despesasRouter.put('/:id', httpPutDespesas);
despesasRouter.delete('/:id', httpDeleteDespesa);

module.exports = despesasRouter;