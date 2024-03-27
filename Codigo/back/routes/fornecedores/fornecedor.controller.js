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
    ).catch((err) => {
        return res.status(400).json({ erro: err.message });
    });

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

    const id = req.params.id;

    await updateFornecedores(
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
    ).catch((err) => {
        return res.status(400).json({ erro: err.message })
    })

    const data = await getByIdFornecedores(id);

    return res.status(200).json(data);
}

module.exports = {
    httpGetAllFornecedores,
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores,
}