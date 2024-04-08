const {
    getAllForcedores,
    getFornecedorById,
    createFornecedor,
    updateFornecedor,
} = require('../../models/fornecedores/fornecedor.model');
const getPagination = require('../../services/query.service');

async function httpGetAllFornecedores(req, res) {

    const { offset, limit } = getPagination(req.query);

    try {

        const data = await getAllForcedores(offset, limit);
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}

async function httpGetByIdFornecedores(req, res) {

    const id = req.params.id;

    const data = await getFornecedorById(id)

    if (data === null) {
        return res.status(404).json({ erro: 'Fornecedor não encontrado' });
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

    try {

        const createdFornecedor = await createFornecedor(
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
        );

        return res.status(201).json(createdFornecedor);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

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

    try {

        const updatedFornecedor = await updateFornecedor(
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
        );

        if (updatedFornecedor) {
            return res.status(200).json(updatedFornecedor);
        } else {
            return res.status(404).json({ erro: `Fornecedor com id ${id} não encontrado` });
        }

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}

module.exports = {
    httpGetAllFornecedores,
    httpGetByIdFornecedores,
    httpPostFornecedores,
    httpUpdateFornecedores,
}