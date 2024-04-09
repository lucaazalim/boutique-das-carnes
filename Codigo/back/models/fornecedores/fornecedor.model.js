const Fornecedor = require('../fornecedores/fornecedor.sequelize');
const FornecedorPF = require('../fornecedores/pf/fornecedor-pf.sequelize');
const FornecedorPJ = require('../fornecedores/pj/fornecedor-pj.sequelize');

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

    var query = {};

    if (search) {

        query = {
            where: {
                [Op.or]: [
                    { '$pf.cpf$': { [Op.eq]: `${search}` } },
                    { '$pf.nome$': { [Op.like]: `%${search}%` } },
                    { '$pj.cnpj$': { [Op.eq]: `${search}` } },
                    { '$pj.razao_social$': { [Op.like]: `%${search}%` } },
                    { '$pj.nome_fantasia$': { [Op.like]: `%${search}%` } },
                ]
            },
            include: [
                {
                    model: FornecedorPF,
                    as: 'pf'
                },
                {
                    model: FornecedorPJ,
                    as: 'pj'
                }
            ],
        }

    }

    const fornecedores = await Fornecedor.findAll({ query, offset, limit });
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
}