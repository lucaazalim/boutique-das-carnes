const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const routerCompra = require('./compras/compras.router');
const api = express();

api.use('/fornecedores', routerFonecedor);
api.use('/compras', routerCompra);


module.exports = api;