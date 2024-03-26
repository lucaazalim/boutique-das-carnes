const compra = require('../../models/compras/compra.model');

async function getAllCompras(req, res){
    const resultado = await compra.httpGetAllCompras();
    return res.status(200).json(resultado);
}

module. exports = {
    getAllCompras,
}