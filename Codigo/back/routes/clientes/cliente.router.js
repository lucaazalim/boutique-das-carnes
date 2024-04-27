const express = require('express');
const {
    httpPostClientes,
    httpGetByIdClientes,
    httpGetAllClientes,
    httpPutCliente
} = require('./cliente.controller');

const routerCliente = express.Router();

routerCliente.get('/', httpGetAllClientes);
routerCliente.get('/:id', httpGetByIdClientes );
routerCliente.post('/', httpPostClientes );
routerCliente.put('/:id',httpPutCliente);

module.exports = routerCliente;