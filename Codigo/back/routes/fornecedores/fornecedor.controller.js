const {
    getAllForcedores,
    getByIdFornecedores,
    addFornecedores,
    updateFornecedores,
} = require('../../models/fornecedores/fornecedor.model');

async function httpGetAllFornecedores(req, res) {
    const data = await getAllForcedores();
    
    return res.status(200).json(data);
}

async function httpGetByIdFornecedores(req, res) {
    const data = await getByIdFornecedores(req.params.id)
    
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
    );

    return res.status(201).json(data);
}

async function httpUpdateFornecedores(req, res) {
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
    } = req.body;

    await updateFornecedores(
        req.params.id,
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
    );

    const data = await getByIdFornecedores(req.params.id);

    return res.status(200).json(data);
}

module.exports = {
    httpGetAllFornecedores,
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores,
}