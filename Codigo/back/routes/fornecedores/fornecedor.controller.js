const {
    getAllForcedores
} = require('../../models/fornecedores/fornecedor.model');

async function httpGetAllFornecedores(req, res) {
    const data = await getAllForcedores();
    
    return res.status(200).json(data);
}

module.exports = {
    httpGetAllFornecedores
}