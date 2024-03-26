const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const api = express();

api.use('/fornecedor', routerFonecedor);




module.exports = api;