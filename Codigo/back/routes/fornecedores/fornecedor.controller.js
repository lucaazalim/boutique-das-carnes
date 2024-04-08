const {
    getAllForcedores,
    getFornecedorById,
    addFornecedores,
    updateFornecedores,
} = require('../../models/fornecedores/fornecedor.model');
const getPagination = require('../../services/query.service');

async function httpGetAllFornecedores(req, res) {

    const { offset, limit } = getPagination(req.query);
    const data = await getAllForcedores(offset, limit).catch((err) => {
        return res.status(500).json({ erro: err.message });
    });
    return res.status(200).json(data);
}

async function httpGetByIdFornecedores(req, res) {   
    
    const id = req.params.id;
    
    const data = await getFornecedorById(id)
    
    if(data === null) {
        return res.status(404).json({erro: 'Fornecedor não encontrado'});
    }

    return res.status(200).json(data);
}

async function httpPostFornecedores(req, res) {
    const {
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
        pessoa
    } = req.body;

    const data = await addFornecedores(
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
        pessoa
    ).catch((err) => {
        return res.status(400).json({ erro: err.message });
    });

    return res.status(201).json(data);
}

async function httpUpdateFornecedores(req, res) {
    const {
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
    } = req.body;

    const id = req.params.id;

    const data = await updateFornecedores(
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
    ).catch((err) => {
        return res.status(400).json({ erro: err.message })
    })

    return res.status(200).json(data);
}

module.exports = {
    httpGetAllFornecedores,
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores,
}