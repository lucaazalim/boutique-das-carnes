const Item = require('./item.sequelize');

async function getAllPedidoItem() {
    return await Item.findAll();
}

async function getByIdPedidoItem(id) {
    return await Item.findByPk(id);
}

async function createPedidoItem(item) {
    return await Item.create(item);
}

async function updatePedidoItem(id, item) {
    return await Item.update(item, {
        where: {
            id
        }
    });
}

async function deletePedidoItem(id) {
    await Item.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    getAllPedidoItem,
    getByIdPedidoItem,
    createPedidoItem,
    updatePedidoItem,
    deletePedidoItem,
}