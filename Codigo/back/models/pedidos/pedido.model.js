const Pedido = require('./pedido.sequelize');


async function getAllPedido() {
    return await Pedido.findAll();
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