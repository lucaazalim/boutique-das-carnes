const Pedido = require('./pedido.sequelize');

const { getCompraById } = require('../compras/compra.model');
const { getClienteById } = require('../clientes/cliente.model');

async function getAllPedido(offset, limit) {
    return await Pedido.findAll({
        offset,
        limit
    });
}

async function getByIdPedido(id) {
    const result = await Pedido.findByPk(id);
    if (!result) {
        throw new Error('Pedido não encontrado.');
    }
    return result;
}

async function createPedido(pedido) {

    const { 
        id_cliente, 
        id_compra, 
    } = pedido;    

    if ( !id_cliente || !id_compra) {
        throw new Error('Campos: id_cliente e id_compra são obrigatório.');
    }

    if(!(await getCompraById(id_compra)))
        throw new Error('Compra não encontrada');

    if(!(await getClienteById(id_cliente)))
        throw new Error('Cliente não encontrado');

    return await Pedido.create(pedido);
}

async function updatePedido(id, pedido) {
    const { id_cliente, id_compra } = pedido;

    if ( !id_cliente || !id_compra) {
        throw new Error('Campos: id_cliente e id_compra são obrigatório.');
    }
    return await Pedido.update(pedido, {
        where: { id }
    })
}

async function deletePedido(id) {
    await getByIdPedido(id);
    await Pedido.destroy({
        where: { id }
    })
}

module.exports = {
    createPedido,
    getAllPedido,
    getByIdPedido,
    updatePedido,
    deletePedido,
}