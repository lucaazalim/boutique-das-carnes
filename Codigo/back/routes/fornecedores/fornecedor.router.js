const express = require('express');
const routerFornecedor = express.Router();
const {
    httpGetAllFornecedores, 
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores
} = require('./fornecedor.controller')

routerFornecedor.get('/', httpGetAllFornecedores);
routerFornecedor.get('/:id', httpGetByIdFornecedores);
routerFornecedor.post('/', httpPostFornecedores);
routerFornecedor.put('/:id', httpUpdateFornecedores);

module.exports = routerFornecedor;