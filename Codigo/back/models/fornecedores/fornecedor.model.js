const Fornecedor = require('../fornecedores/fornecedor.sequelize');
const respostaFornecedor = require('../../services/fornecedor.service');
const { 
    getAllFornecedorPJ,
    verificarSeCnpjExiste,
    updateFornecedorPJ,
    createFornecedorPJ,
    getFornecedorPJById
} = require('../fornecedor-pj/fornecedor-pj.model');
const {
    addFornecedoresPF,
    updateFornecedorPF,
    verificarSeCpfExiste,
    getFornecedorPFById,
    getAllFornecedorPF
} = require('../fornecedor-pf/fornecedor-pf.model');
const { 
    createFornecedorContatos,
    getAllFornecedorContatos
 } = require('../fornecedor-contato/fornecedor-contato.model');

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
        const pessoaF = fonecedorPF.find(p => p.id_fornecedor === fornecedor.id);
        const pessoaJ = fonecedorPJ.find(p => p.id_fornecedor === fornecedor.id);
        const contato = contatos.filter(c => c.id_fornecedor === fornecedor.id);

        fornecedores.push(respostaFornecedor(fornecedor, pessoaF, pessoaJ, contato));
    });

    return fornecedores;
}

async function getByIdFornecedores(id) {
    
    const fornecedorPF = await getFornecedorPFById(id);
    const fornecedorPJ = await getFornecedorPJById(id);
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
    nome_fantasia,
    contatos) {
    
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
            await createFornecedorPJ(newFornecedor.id, cnpj, razao_social, nome_fantasia)
        }

        const contatoComId = contatos.map(contato => {
            return {
                ...contato,
                id_fornecedor: newFornecedor.id
            }
        })

        console.log("contatos", contatoComId);

        const newContatos = await createFornecedorContatos(contatoComId);

        const fornecedorPF = await getFornecedorPFById(newFornecedor.id);
        const fornecedorPJ = await getFornecedorPJById(newFornecedor.id);
        const fornecedor = await Fornecedor.findByPk(newFornecedor.id);

        const data = [];

        data.push(respostaFornecedor(fornecedor, fornecedorPF, fornecedorPJ, newContatos));

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
            await updateFornecedorPF(id, nome);
        } catch (error) {
            throw new Error(error);
        }
    }

    if (fornecedor.tipo === 'PJ' && (razao_social !== undefined || nome_fantasia !== undefined)) {
        try {
            await updateFornecedorPJ(id, razao_social, nome_fantasia);
        } catch (error) {
            throw new Error(error);
        }
    }

    const updatedFornecedorPF = await getFornecedorPFById(id);
    const updatedFornecedorPJ = await getFornecedorPJById(id);

    const resposta = [];

    resposta.push(respostaFornecedor(fornecedor, updatedFornecedorPF, updatedFornecedorPJ));

    if (updatedFornecedorPF === undefined && updatedFornecedorPJ === undefined && updatedFornecedor[0] === 0) {
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