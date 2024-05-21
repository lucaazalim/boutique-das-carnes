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

const api = express();

// Rota para teste
api.get('/teste', tokenValidated, (req, res) => {
    res.status(200).send('<h1>Acessado com sucesso</h1>');
})

api.use('/fornecedores', routerFonecedor);
api.use('/compras', routerCompra);
api.use('/documentos', routerDocumentos);
api.use('/usuarios', routerUsuario);
api.use('/login', routerLogin);
api.use('/clientes', routerCliente);
api.use('/estoque', routerEstoque);
api.use('/despesas', routerDespesa);
api.use('/despesas-categorias', routerDespesaCategorias);
api.use('/relatorios', routerRelatorios);
api.use('/pedidos', routerPedido);

module.exports = api;