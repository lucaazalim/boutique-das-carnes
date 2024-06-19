const Item = require('./item.sequelize');

const {updateEstoque} = require('../../estoque/estoque.model');

const {CONJUNTOS} = require('../../../constants/pedido.constant');

async function getByIdPedidoItem(id_pedido) {

    const result = await Item.findAll({
        where: {
            id_pedido
        }
    });
    if (!result) {
        throw new Error('Item do pedido não encontrado.');
    }

    return result;
}

async function getByIdItem(id) {

    const result = await Item.findByPk(id);
    if (!result) {
        throw new Error('Item não encontrado.');
    }

    return result;
}

async function createItem(item) {
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

    item.valor_total = peso ? peso * preco : quantidade * preco;

    // Criação do item pedido com id_pedido_item
    const result = await Item.create(item);

    let itens = [];
    const id_pedido_item = {id_pedido_item: result.id};

    itens = CONJUNTOS.find(conjunto => conjunto.nome === item.conjunto).itens;

    for (let tipo of itens) {
        await updateEstoque(id_pedido_item, tipo, parseInt(quantidade));
    }

    return result;
}

async function deleteItem(id) {
    await Item.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    getByIdPedidoItem,
    getByIdItem,
    createItem,
    deleteItem
}