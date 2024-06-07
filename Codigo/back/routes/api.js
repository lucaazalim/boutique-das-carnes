const express = require('express');
const routerFonecedor = require('./fornecedores/fornecedor.router');
const routerCompra = require('./compras/compras.router');
const routerDocumentos = require('./documentos/documentos.router');
const routerUsuario = require('../routes/usuarios/usuario.router');
const routerLogin = require('../routes/login/login.router');
const routerCliente = require('../routes/clientes/cliente.router');
const routerEstoque = require('../routes/estoque/estoque.router');
const routerDespesa = require('../routes/despesas/despesa.router');
const routerDespesaCategorias = require('./despesas-categorias/despesa-categoria.router');
const routerRelatorios = require('./relatorios/relatorios.router');
const routerPedido = require('../routes/pedidos/pedido.router');

const tokenValidated = require('../middlewares/authentication.middleware');
const authorize = require('../middlewares/authorization.middleware');

const api = express();

// Rota Pública
api.use('/login', routerLogin);

// Rotas Privadas
api.use(tokenValidated);

// Autenticação administrador
api.use('/usuarios', authorize(['ADMINISTRADOR']), routerUsuario);
api.use('/relatorios', authorize(['ADMINISTRADOR']), routerRelatorios);

// Autenticação administrador e gerente
api.use('/fornecedores', authorize(['ADMINISTRADOR', 'GERENTE']), routerFonecedor);
api.use('/compras', authorize(['ADMINISTRADOR', 'GERENTE']), routerCompra);
api.use('/documentos', authorize(['ADMINISTRADOR', 'GERENTE']), routerDocumentos);
api.use('/clientes', authorize(['ADMINISTRADOR', 'GERENTE']), routerCliente);
api.use('/estoque', authorize(['ADMINISTRADOR', 'GERENTE']), routerEstoque);
api.use('/despesas', authorize(['ADMINISTRADOR', 'GERENTE']), routerDespesa);
api.use('/despesas-categorias', authorize(['ADMINISTRADOR', 'GERENTE']), routerDespesaCategorias);
api.use('/pedidos', authorize(['ADMINISTRADOR', 'GERENTE']), routerPedido);

module.exports = api;