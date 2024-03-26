const express = require('express');
const comprasControler = require('./compras.controller');

const routerCompras = express.Router();

routerCompras.get('/', comprasControler.getAllCompras);

module.exports = routerCompras;