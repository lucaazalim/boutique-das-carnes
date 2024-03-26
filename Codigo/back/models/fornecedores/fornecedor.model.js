const Fornecedor = require('../fornecedores/fornecedor.mariadb');

async function getAllForcedores() {
    return await Fornecedor.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
}

module.exports = {
    getAllForcedores
}