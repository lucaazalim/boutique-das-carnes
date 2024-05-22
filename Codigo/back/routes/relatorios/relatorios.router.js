const express = require('express');
const relatoriosRouter = express.Router();

const {
    httpGetComprasByFornecedor
} = require('./relatorios.controller');

relatoriosRouter.get('/compras-by-fornecedor', httpGetComprasByFornecedor);

module.exports = relatoriosRouter;