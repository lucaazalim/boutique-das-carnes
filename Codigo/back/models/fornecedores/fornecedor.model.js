const Fornecedor = require('../fornecedores/fornecedor.sequelize');

const { Op } = require('sequelize');

const {
    checkIfCNPJExists,
    updateFornecedorPJ,
    createFornecedorPJ,
} = require('../fornecedores/pj/fornecedor-pj.model');

const {
    checkIfCPFExists,
    createFornecedorPF,
    updateFornecedorPF,
} = require('../fornecedores/pf/fornecedor-pf.model');

async function getAllForcedores(offset, limit, search = null) {

    var options = {};

    if (search) {

        options = {
            where: {
                [Op.or]: [
                    { '$pf.cpf$': { [Op.like]: `${search}%` } },
                    { '$pf.nome$': { [Op.like]: `%${search}%` } },
                    { '$pj.cnpj$': { [Op.like]: `${search}%` } },
                    { '$pj.razao_social$': { [Op.like]: `%${search}%` } },
                    { '$pj.nome_fantasia$': { [Op.like]: `%${search}%` } },
                ]
            },
        }

    } else {

        options = { offset, limit };

    }

    const fornecedores = await Fornecedor.findAll(options);
    fornecedores.forEach(rearrangePessoa);
    return fornecedores;

}

async function getFornecedorById(id) {

    const fornecedor = await Fornecedor.findByPk(id);

    if (fornecedor) {
        rearrangePessoa(fornecedor);
    }

    return fornecedor;

}

async function createFornecedor(
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
    pessoa) {

    if (!pessoa) {
        throw new Error('Pessoa não informada');
    }

    if (pessoa) {

        if (tipo === 'PF') {

            if (!pessoa.nome || !pessoa.cpf) {
                throw new Error('Nome e CPF são obrigatórios para pessoa física');
            }

            pessoa.cpf = pessoa.cpf.replace(/\D/g, '');

        } else if (tipo === 'PJ') {

            if (!pessoa.razao_social || !pessoa.cnpj) {
                throw new Error('Razão social e CNPJ são obrigatórios para pessoa jurídica');
            }

            pessoa.cnpj = pessoa.cnpj.replace(/\D/g, '');

        }

    }

    if (tipo === 'PF' && await checkIfCPFExists(pessoa.cpf)) {
        throw new Error('CPF já cadastrado');
    } else if (tipo === 'PJ' && await checkIfCNPJExists(pessoa.cnpj)) {
        throw new Error('CNPJ já cadastrado');
    }

    const createdFornecedor = await Fornecedor.create({
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
    });

    if (tipo === 'PF') {
        await createFornecedorPF(createdFornecedor.id, pessoa.cpf, pessoa.nome);
    } else if (tipo === 'PJ') {
        await createFornecedorPJ(createdFornecedor.id, pessoa.cnpj, pessoa.razao_social, pessoa.nome_fantasia)
    }

    const fornecedor = await Fornecedor.findByPk(createdFornecedor.id);
    rearrangePessoa(fornecedor);

    return fornecedor;

}

async function updateFornecedor(
    id,
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
    pessoa
) {

    await Fornecedor.update({
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
    });

    var fornecedor = await Fornecedor.findByPk(id);

    if (!fornecedor) {
        throw new Error('Fornecedor não encontrado');
    }

    if (pessoa) {

        if (fornecedor.tipo === 'PF' && pessoa.nome) {

            await updateFornecedorPF(id, pessoa.nome);

        } else if (fornecedor.tipo === 'PJ' && (pessoa.razao_social || pessoa.nome_fantasia)) {

            await updateFornecedorPJ(id, pessoa.razao_social, pessoa.nome_fantasia);

        }

    }

    fornecedor = await Fornecedor.findByPk(id);
    rearrangePessoa(fornecedor);

    return fornecedor;

}

async function deleteFornecedorById(id) {
    try {
        await Fornecedor.destroy({ where: { id } });
    } catch (error) {
        throw new Error(`Erro ao deletar fornecedor por id: ${error.message}`);
    }
}

function rearrangePessoa(fornecedor) {
    const { dataValues } = fornecedor;
    dataValues.pessoa = dataValues.pf ? dataValues.pf : dataValues.pj;
    delete dataValues.pessoa.dataValues.id_fornecedor;
    delete dataValues.pf;
    delete dataValues.pj;
}

module.exports = {
    getAllForcedores,
    getFornecedorById,
    createFornecedor,
    updateFornecedor,
    deleteFornecedorById
}