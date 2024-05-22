const Item = require('./item.sequelize');

const { updateEstoque } = require('../../estoque/estoque.model');

const { CONJUNTOS } = require('../../../constants/pedido.constant');

async function getAllPedidoItem() {
    return await Item.findAll();
}

async function getByIdPedidoItem(id) {

    const result = await Item.findByPk(id);
    if (!result) {
        throw new Error('Item não encontrado.');
    }

    return result;
}

async function createPedidoItem(item) {
    const {
        id_pedido,
        conjunto,
        letra,
        quantidade,
        peso,
        preco
    } = item;

    if (!id_pedido || !conjunto || !letra || !quantidade || !peso || !preco) {
        throw new Error('Campos do item do pedido: conjunto, letra, quantidade, peso e preco são obrigatórios.');
    }

    // Criação do item pedido com id_pedido_item
    const result = await Item.create(item);
    
    let itens = [];
    const id_pedido_item = { id_pedido_item: result.id };

    itens = CONJUNTOS.find(conjunto => conjunto.nome === item.conjunto).itens;

    for (let tipo of itens) {
        const updated = await updateEstoque( id_pedido_item, tipo, quantidade);
        console.log("UPDATED: ", updated);
    }

    return result;
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
    deletePedidoItem,
}