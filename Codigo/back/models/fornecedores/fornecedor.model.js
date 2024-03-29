const Fornecedor = require('../fornecedores/fornecedor.sequelize');
const FornecedorPF = require('../fornecedor-pf/fornecedor-pf.sequelize');
const FornecedorPJ = require('../fornecedor-pj/fornecedor-pj.sequelize');
const respostaFornecedor = require('../../services/fornecedor.service');
const { Op } = require('sequelize');

async function getAllForcedores(offset, limit) {

    const fornecedor = await Fornecedor.findAll({
        offset: offset,
        limit: limit,
    });

    const fornecedorFirst = fornecedor[0];
    const fornecedorLast = fornecedor[fornecedor.length - 1];

    const fonecedorPF = await FornecedorPF.findAll({
        where: {
            id_fornecedor: {
                [Op.between]: [fornecedorFirst.id, fornecedorLast.id]
            }
        }
    });
    const fonecedorPJ = await FornecedorPJ.findAll({
        where: {
            id_fornecedor: {
                [Op.between]: [fornecedorFirst.id, fornecedorLast.id]
            }
        }
    });

    const fornecedores = [];

    fornecedor.forEach(fornecedor => {
        const pessoaF = fonecedorPF.find(p => p.id_fornecedor === fornecedor.id);
        const pessoaJ = fonecedorPJ.find(p => p.id_fornecedor === fornecedor.id);

        fornecedores.push(respostaFornecedor(fornecedor, pessoaF, pessoaJ));
    });

    return fornecedores;
}

async function getByIdFornecedores(id) {
    
    const fornecedorPF = await FornecedorPF.findByPk(id);
    const fornecedorPJ = await FornecedorPJ.findByPk(id);
    const fornecedor = await Fornecedor.findByPk(id);

    const data = [];

    data.push(respostaFornecedor(fornecedor, fornecedorPF, fornecedorPJ));

    return data;
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
    notas,
    cpf,
    nome,
    cnpj,
    razao_social,
    nome_fantasia) {

    // verificar se existe cnpj ou cpf cadastrado no banco de dados
    
    if (tipo === 'PF' && await verificarSeCpfExiste(cpf)) {
        return {
            erro: "CPF já cadastrado"
        }
    }

    if (tipo === 'PJ' && await verificarSeCnpjExiste(cnpj)) {
        return {
            erro: "CNPJ já cadastrado"
        }
    }

    try {
        const newFornecedor = await Fornecedor.create({
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

        if (tipo === 'PF') {
            await addFornecedoresPF(newFornecedor.id, cpf, nome);
        }

        if (tipo === 'PJ') {
            await addFornecedoresPJ(newFornecedor.id, cnpj, razao_social, nome_fantasia)
        }

        const fornecedorPF = await FornecedorPF.findByPk(newFornecedor.id);
        const fornecedorPJ = await FornecedorPJ.findByPk(newFornecedor.id);
        const fornecedor = await Fornecedor.findByPk(newFornecedor.id);

        const data = [];

        data.push(respostaFornecedor(fornecedor, fornecedorPF, fornecedorPJ));

        return data;

    } catch (error) {
        throw new Error(error);
    }

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
    nome,
    razao_social,
    nome_fantasia
) {
    const fornecedor = await Fornecedor.findByPk(id);

    if (!fornecedor) {
        throw new Error('Fornecedor não encontrado');
    }

    let updatedFornecedorPF;
    let updatedFornecedorPJ;

    let updatedFornecedor = await Fornecedor.update({
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
    });

    if (fornecedor.tipo === 'PF' && nome !== undefined) {
        try {
            updatedFornecedorPF = await updateFornecedorPF(id, nome);
        } catch (error) {
            throw new Error(error);
        }
    }

    if (fornecedor.tipo === 'PJ' && (razao_social !== undefined || nome_fantasia !== undefined)) {
        try {
            updatedFornecedorPJ = await updateFornecedorPJ(id, razao_social, nome_fantasia);
        } catch (error) {
            throw new Error(error);
        }
    }

    const resposta = [];

    resposta.push(respostaFornecedor(fornecedor, updatedFornecedorPF, updatedFornecedorPJ));

    if (updatedFornecedorPF === undefined && updatedFornecedorPJ === undefined && updatedFornecedor[0] === 0) {
        throw new Error('Nenhum dado do fornecedor foi atualizado');
    }

    return resposta;
}

// Função para verificar se o email já existe 

async function verificarSeEmailExiste(email) {
    const fornecedor = await Fornecedor.findOne({
        where: { email }
    });
    
    return fornecedor !== null;
}

// Função para verificar se o cpf já existe

async function verificarSeCpfExiste(cpf) {
    const fornecedor = await FornecedorPF.findOne({
        where: { cpf }
    });
    return fornecedor !== null;
}

// Função para verificar se o cnpj já existe

async function verificarSeCnpjExiste(cnpj) {
    const fornecedor = await FornecedorPJ.findOne({
        where: { cnpj }
    });
    return fornecedor !== null;
}

// Função para adicionar fornecedores PF

async function addFornecedoresPF(id, cpf, nome) {
    await FornecedorPF.create({
        id_fornecedor: id,
        cpf,
        nome
    })
}

// Função para adicionar fornecedores PJ

async function addFornecedoresPJ(id, cnpj, razao_social, nome_fantasia) {
    await FornecedorPJ.create({
        id_fornecedor: id,
        cnpj,
        razao_social,
        nome_fantasia
    })
}

// Função para atualizar fornecedores PF

async function updateFornecedorPF(id, nome) {
    await FornecedorPF.update({
        nome
    }, {
        where: { id_fornecedor: id }
    })
    return await FornecedorPF.findByPk(id);
}

// Função para atualizar fornecedores PJ

async function updateFornecedorPJ(id, razao_social, nome_fantasia) {
    return await FornecedorPJ.update({
        razao_social,
        nome_fantasia
    }, {
        where: { id_fornecedor: id }
    })
}

module.exports = {
    getAllForcedores,
    getByIdFornecedores,
    addFornecedores,
    updateFornecedores,
}