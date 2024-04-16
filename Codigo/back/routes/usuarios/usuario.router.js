const express = require('express');
const routerUsuario = express.Router();
const {
    httpGetByIdUsuario,
    httpPostUsuario,
    httpPutUsuario,
    httpDeleteUsuario,
    httpGetAllUsuario
} = require('./usuario.controller');

routerUsuario.get('/', httpGetAllUsuario)
routerUsuario.get('/:id', httpGetByIdUsuario);
routerUsuario.post('/', httpPostUsuario);
routerUsuario.put('/:id', httpPutUsuario);
routerUsuario.delete('/:id', httpDeleteUsuario);

module.exports = routerUsuario;