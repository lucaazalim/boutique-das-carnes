const express = require('express');
const {
    httpPostClientes,
    httpGetByIdClientes,
    httpGetAllClientes,
    httpPutClientes,
    httpDeleteClientes
} = require('./cliente.controller');

const routerCliente = express.Router();

routerCliente.get('/', httpGetAllClientes);
routerCliente.get('/:id', httpGetByIdClientes );
routerCliente.post('/', httpPostClientes);
routerCliente.put('/:id',httpPutClientes);
routerCliente.delete('/:id', httpDeleteClientes);

module.exports = routerCliente;