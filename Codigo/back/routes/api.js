const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const routerCompra = require('./compras/compras.router');
const routerDocumentos = require('./documentos/documentos.router');

const api = express();

api.use('/fornecedores', routerFonecedor);
api.use('/compras', routerCompra);
api.use('/documentos', routerDocumentos);

module.exports = api;