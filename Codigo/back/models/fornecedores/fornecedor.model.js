const Fornecedor = require('../fornecedores/fornecedor.mariadb');

async function getAllForcedores() {
    return await Fornecedor.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { ativo: true }
    })
}

async function getByIdFornecedores(id) {
    return Fornecedor.findAll({
        attributes: {
            id
        }
    })
}

module.exports = {
    getAllForcedores,
    getByIdFornecedores,
}