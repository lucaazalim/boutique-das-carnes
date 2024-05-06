const Estoque = require('./estoque.sequelize');

async function getAllEstoque() {
    return await Estoque.findAll();
}

// enum('FIGADO','DIANTEIRO_SEM_CUPIM','CUPIM','SERROTE_SEM_RABADA','COSTELA','RABADA')

async function createEstoque(id_compra_carcaca, carregado) {

    var tipos = [
        'FIGADO',
        'DIANTEIRO_SEM_CUPIM',
        'SERROTE_SEM_RABADA',
        'COSTELA',
        'RABADA'
    ]

    if (carregado)
        tipos.push('CUPIM');

    const itens = [];

    for (let tipo of tipos) {
        itens.push({
            id_compra_carcaca,
            tipo
        })
    }

    return await Estoque.bulkCreate(itens);

}

async function getSummary() {
    return await Estoque.findAll({
        attributes: ['tipo', [Estoque.sequelize.fn('COUNT', '*'), 'quantidade']],
        group: ['tipo']
    });
}

module.exports = {
    getAllEstoque,
    createEstoque,
    getSummary,
}