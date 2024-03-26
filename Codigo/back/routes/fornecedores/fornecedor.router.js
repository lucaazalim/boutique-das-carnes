const express = require('express');
const routerFornecedor = express.Router();
const {
    httpGetAllFornecedores
} = require('./fornecedor.controller')

routerFornecedor.get('/', httpGetAllFornecedores)


module.exports = routerFornecedor;