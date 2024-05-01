const express = require('express');
const {
    httpPostClientes,
    httpGetByIdClientes,
    httpGetAllClientes,
    httpPutCliente,
    httpDeleteCliente
} = require('./cliente.controller');

const routerCliente = express.Router();

routerCliente.get('/', httpGetAllClientes);
routerCliente.get('/:id', httpGetByIdClientes );
routerCliente.post('/', httpPostClientes );
routerCliente.put('/:id',httpPutCliente);
routerCliente.delete('/:id', httpDeleteCliente);

module.exports = routerCliente;