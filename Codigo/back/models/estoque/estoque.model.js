const Estoque = require('./estoque.sequelize');
const ESTOQUE_ITENS = require('../../constants/estoque.constant');
const { INDIVISIVEIS, CONJUNTOS } = require('../../constants/pedido.constant');
const { Op } = require('sequelize');

async function getAllEstoque() {
    return await Estoque.findAll();
}

async function createEstoque(id_compra_carcaca) {

    const itens = [];

    for (let tipo of ESTOQUE_ITENS) {
        itens.push({
            id_compra_carcaca,
            tipo
        })
    }

    return await Estoque.bulkCreate(itens);

}

// para criterio de update não é ncessario passar id, somente se existir valor null é o suficiente
async function updateEstoque(updateFields, tipo, quantidade) {

    return await Estoque.update(updateFields, {
        where: {
            tipo: tipo,
            id_pedido_item: null
        },
        limit: quantidade
    });
}
// refatorar função para indicar somente itens que estão disponíveis no estoque, ou seja, que não tem vinculo id_pedido_item

async function getSummary() {
    return await Estoque.findAll({
        attributes: ['tipo', [Estoque.sequelize.fn('COUNT', '*'), 'quantidade']],
        group: ['tipo'],
        where: {
            id_pedido_item: null
        },
    });
}

// Criar função onde verifica se o item já existe no estoque

async function checkItem(item, quantidade) {

    const conjuntoEncontrado = CONJUNTOS.find(conjunto => conjunto.nome === item);
    if (!conjuntoEncontrado) {
        throw new Error(`Item do pedido ${item} não encontrado.`);
    }

    const pedido = conjuntoEncontrado.itens;

    const itensDisponiveis = await Estoque.findAll({
        where: {
            tipo: {
                [Op.in]: pedido
            },
            id_pedido_item: null
        },
        group: ['tipo'],
        attributes: ['tipo', [Estoque.sequelize.fn('COUNT', '*'), 'quantidade']],
        raw: true
    });

    let pedidoEstoque = pedido.reduce((acc, item) => {
        if (!acc[item]) {
            acc[item] = 1;
        } else {
            acc[item]++;
        }
        return acc;
    }, {});

    pedidoEstoque = Object.keys(pedidoEstoque).map(nome => ({
        nome: nome,
        quantidade: pedidoEstoque[nome] * quantidade
    }));

    for (let item of pedidoEstoque) {
        let itemDisponivel = itensDisponiveis.find(i => i.tipo === item.nome);
        if (!itemDisponivel || itemDisponivel.quantidade < item.quantidade) {
            throw new Error(`Item do pedido ${item.nome} não está disponível no estoque.`);
        }
    }

    return true;
}

module.exports = {
    getAllEstoque,
    createEstoque,
    updateEstoque,
    getSummary,
    checkItem
}