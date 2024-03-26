const {
    getAllForcedores,
    getByIdFornecedores
} = require('../../models/fornecedores/fornecedor.model');

async function httpGetAllFornecedores(req, res) {
    const data = await getAllForcedores();
    
    return res.status(200).json(data);
}

async function httpGetByIdFornecedores(req, res) {
    const data = await getByIdFornecedores(req.params.id)
    
    return res.status(200).json(data);
}

module.exports = {
    httpGetAllFornecedores,
    httpGetByIdFornecedores
}