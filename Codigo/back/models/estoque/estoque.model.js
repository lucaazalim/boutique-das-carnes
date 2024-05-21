const Estoque = require('./estoque.sequelize');
//const { ESTOQUE_ITENS } = require('../../constants/estoque.constant');
const { INDIVISIVEIS, CONJUNTOS } = require('../../constants/pedido.constant');
const { Op } = require('sequelize');

ESTOQUE_ITENS = [
    'FIGADO',
    'DIANTEIRO_SEM_COSTELA',
    'DIANTEIRO_SEM_COSTELA',
    'SERROTE_SEM_RABADA',
    'SERROTE_COM_RABADA',
    'COSTELA',
    'COSTELA',
    'FATO'
]

async function getAllEstoque() {
    return await Estoque.findAll();
}

// enum('FIGADO','DIANTEIRO_SEM_COSTELA','CUPIM','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','FATO')

async function createEstoque(id_compra_carcaca) {

    console.log("ESTOQUE: ",ESTOQUE_ITENS);
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
    console.log("TIPO: ", tipo);
    console.log("ID_PEDIDO_ITEM: ", updateFields);

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
        group: ['tipo']
    });
}

// Criar função onde verifica se o item já existe no estoque

async function checkItem(item) {

    const conjuntoEncontrado = CONJUNTOS.find(conjunto => conjunto.nome === item);
    if (!conjuntoEncontrado) {
        throw new Error(`Item do pedido ${item} não encontrado.`);
    }

    const pedido = conjuntoEncontrado.itens;

    console.log("PEDIDO: ", pedido);

    const itensDisponiveis = await Estoque.findAll({
        where: {
            tipo: {
                [Op.in]: pedido
            },
            id_pedido_item: null
        }
    });

    console.log("ITENS DISPONÍVEIS: ", itensDisponiveis);
    console.log("ITENS DISPONÍVEIS LENGTH: ", itensDisponiveis.length);
    console.log("PEDIDO LENGTH: ", pedido.length);

    // Verificar se a quantidade de itens disponíveis é igual à quantidade de itens do conjunto
    if (itensDisponiveis.length >= pedido.length) {
        return true;
    } else {
        throw new Error(`Item do pedido ${item} não está disponível no estoque.`);
    }

}

module.exports = {
    getAllEstoque,
    createEstoque,
    updateEstoque,
    getSummary,
    checkItem
}