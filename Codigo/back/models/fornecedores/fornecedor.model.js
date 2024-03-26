const Fornecedor = require('../fornecedores/fornecedor.sequelize');

async function getAllForcedores() {
    return await Fornecedor.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
}

async function getByIdFornecedores(id) {
    return await Fornecedor.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
            id
        }
    })
}

module.exports = {
    getAllForcedores,
    getByIdFornecedores,
}