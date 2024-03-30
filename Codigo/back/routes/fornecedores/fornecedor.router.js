const express = require('express');
const routerFornecedor = express.Router();
const {
    httpGetAllFornecedores, 
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores
} = require('./fornecedor.controller')
const {
    httpGetAllFornecedorContatos,
    httpPostFornecedorContatos,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos
} = require('./fornecedores-contatos/fornecedor-contato.controller');


// Rotas para contatos de fornecedores => /fornecedores
routerFornecedor.get('/contatos', httpGetAllFornecedorContatos);
routerFornecedor.post('/:idFornecedor/contatos', httpPostFornecedorContatos);
routerFornecedor.put('/:idFornecedor/contatos/:id', httpPutFornecedorContatos);
routerFornecedor.delete('/:idFornecedor/contatos/:id', httpDeleteFornecedorContatos);

// Rotas para fornecedores
routerFornecedor.get('/', httpGetAllFornecedores);
routerFornecedor.get('/:id', httpGetByIdFornecedores);
routerFornecedor.post('/', httpPostFornecedores);
routerFornecedor.put('/:id', httpUpdateFornecedores);


module.exports = routerFornecedor;