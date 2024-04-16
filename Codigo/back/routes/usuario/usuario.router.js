const express = require('express');
const routerUsuario = express.Router();
const {
    httpGetByIdUsuario,
    httpPostUsuario,
    httpPutUsuario
} = require('./usuario.controller');


routerUsuario.get('/:id', httpGetByIdUsuario);
routerUsuario.post('/', httpPostUsuario);
routerUsuario.put('/:id', httpPutUsuario);


module.exports = routerUsuario;