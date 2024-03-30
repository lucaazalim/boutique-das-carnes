const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const routerCompra = require('./compras/compras.router');
const routerCompraPagamento = require('./compras-pagamentos/compras-pagamentos.router');

const api = express();

api.use('/fornecedores', routerFonecedor);
api.use('/compras', routerCompra);
api.use('/compras-pagamentos', routerCompraPagamento);


module.exports = api;