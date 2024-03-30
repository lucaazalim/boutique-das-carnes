const express = require('express');
const routerFornecedorContato = express.Router();
const {
    httpGetAllFornecedorContatos,
    httpPostFornecedorContatos,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos
} = require('./fornecedor-contato.controller');

routerFornecedorContato.get('/', httpGetAllFornecedorContatos);
routerFornecedorContato.post('/', httpPostFornecedorContatos);
routerFornecedorContato.put('/:id', httpPutFornecedorContatos);
routerFornecedorContato.delete('/:id', httpDeleteFornecedorContatos);

module.exports = routerFornecedorContato;