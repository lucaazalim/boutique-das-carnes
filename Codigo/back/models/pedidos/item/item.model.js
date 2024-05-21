const Item = require('./item.sequelize');
const { updateEstoque } = require('../../estoque/estoque.model');
const { CONJUNTOS } = require('../../../constants/pedido.constant');

async function getAllItem() {
    return await Item.findAll();
}

async function getByIdItem(id) {
    return await Item.findByPk(id);
}

async function createItem(item) {

    let itens = [];
    const id_pedido = { id_pedido: item.id_pedido };

    itens = CONJUNTOS.find(conjunto => conjunto.nome === item.conjunto).itens;

    console.log("ITENS: ", itens);

    itens = itens.map(item => ({ tipo:item }));

    console.log("ITENS: ", itens);

    for (let tipo of itens) {
        const updated = await updateEstoque( id_pedido, tipo);
        console.log("UPDATED: ", updated);
    }

    return await Item.create(item);
}

async function updateItem(id, item) {
    return await Item.update(item, {
        where: {
            id
        }
    });
}

async function deleteItem(id) {
    await Item.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    getAllItem,
    getByIdItem,
    createItem,
    updateItem,
    deleteItem,
}