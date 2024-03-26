const express = require('express');
const routerFornecedor = express.Router();
const {
    httpGetAllFornecedores, 
    httpGetByIdFornecedores,
} = require('./fornecedor.controller')

routerFornecedor.get('/', httpGetAllFornecedores);
routerFornecedor.get('/:id', httpGetByIdFornecedores);


module.exports = routerFornecedor;