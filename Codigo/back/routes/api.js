const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const api = express();

api.use('/fornecedores', routerFonecedor);




module.exports = api;