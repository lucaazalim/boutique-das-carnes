const Fornecedor = require('../fornecedores/fornecedor.sequelize');

async function getAllForcedores(offset, limit) {
    return await Fornecedor.findAll({
        offset: offset,
        limit: limit,
    });
}

async function getByIdFornecedores(id) {
    return await Fornecedor.findByPk(id);
}

async function addFornecedores(
    tipo,
    email,
    telefone,
    celular,
    cep,
    logradouro,
    bairro,
    numero,
    complemento,
    estado,
    cidade,
    ativo,
    notas) {
        const data = await Fornecedor.create({
        tipo,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        bairro,
        numero,
        complemento,
        estado,
        cidade,
        ativo,
        notas
    })
    return data;
}

async function updateFornecedores(
    id,
    tipo,
    email,
    telefone,
    celular,
    cep,
    logradouro,
    bairro,
    numero,
    complemento,
    estado,
    cidade,
    ativo,
    notas,
) {
    const data = await Fornecedor.update({
        tipo,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        bairro,
        numero,
        complemento,
        estado,
        cidade,
        ativo,
        notas,
    }, {
        where: { id }
    })
    return data;
}

module.exports = {
    getAllForcedores,
    getByIdFornecedores,
    addFornecedores,
    updateFornecedores,
}