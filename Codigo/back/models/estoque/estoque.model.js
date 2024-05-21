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
async function updateEstoque(updateFields, tipo) {
    console.log("TIPO: ", tipo);
    console.log("ID_PEDIDO_ITEM: ", updateFields);

    return await Estoque.update(updateFields, {
        where: {
            tipo: tipo,
            id_pedido_item: null
        },
        limit: 1
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

    // console.log("CONJUNTOS: ",CONJUNTOS)

    let pedido = [];

    const conjuntoEncontrado = CONJUNTOS.find(conjunto => conjunto.nome === item);
    pedido = conjuntoEncontrado.itens;

    const itensDisponiveis = await Estoque.findAll({
        where: {
            tipo: {
                [Op.in]: pedido
            },
            id_pedido_item: null
        }
    });

    // somente pode retornar true se todos os itens do conjunto estiverem disponíveis

    if (itensDisponiveis) {
        return true;
    } else {
        throw new Error(`Item ${item} não está disponivel.`);
    }

}

module.exports = {
    getAllEstoque,
    createEstoque,
    updateEstoque,
    getSummary,
    checkItem
}