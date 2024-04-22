const express = require('express');
const {
    httpPostClientes,
    httpGetByIdClientes
} = require('./cliente.controller');

const routerCliente = express.Router();

routerCliente.get('/', );
routerCliente.get('/:id', httpGetByIdClientes );
routerCliente.post('/', httpPostClientes );
routerCliente.put('/:id',);

module.exports = routerCliente;