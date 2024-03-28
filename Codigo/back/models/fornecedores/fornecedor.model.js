const Fornecedor = require('../fornecedores/fornecedor.sequelize');
const FornecedorPF = require('../fornecedores/fornecedor-pf.sequelize');
const FornecedorPJ = require('../fornecedores/fornecedor-pj.sequelize');

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
        try {
            await addFornecedoresPF(newFornecedor.id, cpf, nome);
        } catch (error) {
            throw new Error(error);
        }
    }

    if (tipo === 'PJ') {
        try {
            await addFornecedoresPJ(newFornecedor.id, cnpj, razao_social, nome_fantasia);
        } catch (error) {
            throw new Error(error);
        }
    }

    const plainFornecedor = newFornecedor.get({ plain: true });

    return plainFornecedor;
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
        return {
            erro: "Fornecedor não encontrado"
        }
    }

    const updatedFornecedor = await Fornecedor.update({
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

    return updatedFornecedor;
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
    return await FornecedorPF.update({
        nome
    }, {
        where: { id_fornecedor: id }
    })
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