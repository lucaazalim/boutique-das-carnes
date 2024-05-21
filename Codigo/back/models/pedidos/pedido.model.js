const Pedido = require('./pedido.sequelize');

async function createPedido(pedido) {
    return await Pedido.create(pedido);
}

async function getAllPedido() {
    return await Pedido.findAll();
}

async function getByIdPedido(id) {
    return await Pedido.findByPk(id);
}

async function updatePedido(id, pedido) {
    return await Pedido.update(pedido, {
        where: { id }
    })
}

async function deletePedido(id) {
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