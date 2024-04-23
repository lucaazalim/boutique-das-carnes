const express = require('express');
const routerFornecedor = express.Router();
const {
    httpGetAllFornecedores,
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores,
    httpDeleteFornecedorById
} = require('./fornecedor.controller')
const {
    httpPostFornecedorContato,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos,
    httpGetByIdForncedorContatos
} = require('./fornecedores-contatos/fornecedor-contato.controller');


// Rotas para contatos de fornecedores => /fornecedores
routerFornecedor.post('/:id_fornecedor/contatos', httpPostFornecedorContato);
routerFornecedor.get('/contatos/:id', httpGetByIdForncedorContatos);
routerFornecedor.put('/contatos/:id', httpPutFornecedorContatos);
routerFornecedor.delete('/contatos/:id', httpDeleteFornecedorContatos);

// Rotas para fornecedores
routerFornecedor.get('/', httpGetAllFornecedores);
routerFornecedor.get('/:id', httpGetByIdFornecedores);
routerFornecedor.post('/', httpPostFornecedores);
routerFornecedor.put('/:id', httpUpdateFornecedores);
routerFornecedor.delete('/:id', httpDeleteFornecedorById);

module.exports = routerFornecedor;