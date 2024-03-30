const Fornecedor = require('../fornecedores/fornecedor.sequelize');
const respostaFornecedor = require('../../services/fornecedor.service');
const { 
    getAllFornecedorPJ,
    verificarSeCnpjExiste,
    updateFornecedorPJ,
    createFornecedorPJ,
    getFornecedorPJById
} = require('../fornecedores/pj/fornecedor-pj.model');
const {
    addFornecedoresPF,
    updateFornecedorPF,
    verificarSeCpfExiste,
    getFornecedorPFById,
    getAllFornecedorPF
} = require('../fornecedores/pf/fornecedor-pf.model');
const { 
    getAllFornecedorContatos
 } = require('../fornecedores/contatos/fornecedor-contato.model');

async function getAllForcedores(offset, limit) {

    const fornecedor = await Fornecedor.findAll({
        offset: offset,
        limit: limit,
    });

    const fornecedorFirst = fornecedor[0];
    const fornecedorLast = fornecedor[fornecedor.length - 1];

    const fonecedorPF = await getAllFornecedorPF(fornecedorFirst.id, fornecedorLast.id);
    const fonecedorPJ = await getAllFornecedorPJ(fornecedorFirst.id, fornecedorLast.id);
    const contatos = await getAllFornecedorContatos(fornecedorFirst.id, fornecedorLast.id);

    const fornecedores = [];

    fornecedor.forEach(fornecedor => {
        
        var updateValue;

        if (fornecedor.tipo === 'PF') {
            updateValue = fonecedorPF.find(p => p.id_fornecedor === fornecedor.id);
        } else if (fornecedor.tipo === 'PJ') {
            updateValue = fonecedorPJ.find(p => p.id_fornecedor === fornecedor.id);
        }

        const contato = contatos.filter(c => c.id_fornecedor === fornecedor.id);

        fornecedores.push(respostaFornecedor(fornecedor, updateValue, contato));
    });

    return fornecedores;
}

async function getByIdFornecedores(id) {

    const fornecedor = await Fornecedor.findByPk(id);

    var updateValue;

    if (fornecedor.tipo === 'PF') {
        updateValue = await getFornecedorPFById(id);
    } else if (fornecedor.tipo === 'PJ') {
        updateValue = await getFornecedorPJById(id);
    }

    const contatos = await getAllFornecedorContatos(id, id);

    const data = [];

    data.push(respostaFornecedor(fornecedor, updateValue, contatos));

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
    } else if (tipo === 'PJ' && await verificarSeCnpjExiste(cnpj)) {
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

        var updateValue;

        if (tipo === 'PF') {
            await addFornecedoresPF(newFornecedor.id, cpf, nome);
            updateValue = await getFornecedorPFById(newFornecedor.id);
        } else if (tipo === 'PJ') {
            await createFornecedorPJ(newFornecedor.id, cnpj, razao_social, nome_fantasia)
            updateValue = await getFornecedorPJById(newFornecedor.id);
        }

        const fornecedor = await Fornecedor.findByPk(newFornecedor.id);

        const data = [];

        const contatos = [];

        data.push(respostaFornecedor(fornecedor, updateValue, contatos));

        return data;

    } catch (error) {
        throw new Error(error);
    }

}

async function updateFornecedores(
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
    nome,
    razao_social,
    nome_fantasia
) {
    const fornecedor = await Fornecedor.findByPk(id);

    if (!fornecedor) {
        throw new Error('Fornecedor não encontrado');
    }

    let updatedFornecedor = await Fornecedor.update({
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

    var updateValue;

    if (fornecedor.tipo === 'PF' && nome !== undefined) {
        try {
            await updateFornecedorPF(id, nome);
        } catch (error) {
            throw new Error(error);
        }
        updateValue = await getFornecedorPFById(id);
    } else if (fornecedor.tipo === 'PJ' && (razao_social !== undefined || nome_fantasia !== undefined)) {
        try {
            await updateFornecedorPJ(id, razao_social, nome_fantasia);
        } catch (error) {
            throw new Error(error);
        }
        updateValue = await getFornecedorPJById(id);
    }

    const resposta = [];

    resposta.push(respostaFornecedor(fornecedor, updateValue));

    if (updateValue === undefined && updatedFornecedor[0] === 0) {
        throw new Error('Nenhum dado do fornecedor foi atualizado');
    }

    return resposta;
}

module.exports = {
    getAllForcedores,
    getByIdFornecedores,
    addFornecedores,
    updateFornecedores,
}