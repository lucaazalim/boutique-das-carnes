const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const routerCompra = require('./compras/compras.router');
const routerDocumentos = require('./documentos/documentos.router');
const routerUsuario = require('../routes/usuarios/usuario.router');
const routerLogin = require('../routes/login/login.router');

const api = express();

api.use('/fornecedores', routerFonecedor);
api.use('/compras', routerCompra);
api.use('/documentos', routerDocumentos);
api.use('/usuarios', routerUsuario);
api.use('/login', routerLogin);

module.exports = api;