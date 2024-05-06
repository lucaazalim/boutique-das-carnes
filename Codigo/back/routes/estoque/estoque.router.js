const {
    httpGetAllEstoque,
    httpGetSummary,
} = require('./estoque.controller');
const express = require('express');
const routerEstoque = express.Router();

routerEstoque.get('/', httpGetAllEstoque);
routerEstoque.get('/summary', httpGetSummary);

module.exports = routerEstoque;