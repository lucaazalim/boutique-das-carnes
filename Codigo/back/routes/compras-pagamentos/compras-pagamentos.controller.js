const {getAllComprasPagamentos, getComprasPagamentosById, postComprasPagamentos, updateComrpaById} = require('../../models/compras-pagamentos/compras-pagamentos.model');

async function httpGetAllComprasPagamentos(req, res){
    const result =  await getAllComprasPagamentos();
    return res.status(200).json(result);
}

async function httpGetComprasPagamentosById(req, res){
    const id = req.params.id;
    const result =  await getComprasPagamentosById(id);
    return res.status(200).json(result);
}

async function httpPostComprasPagamentos(req, res){
    const { 
        id_compra: id_compra, 
        data, 
        meio_pagamento: meio_pagamento, 
        valor, 
        id_documento_comprovante: id_documento_comprovante, 
    } = req.body;

    const result = await postComprasPagamentos(id_compra, data, meio_pagamento, valor, id_documento_comprovante);
    res.status(201).json(result);
}

async function httpPutCompraById(req, res){
    const id = req.params.id;

    const { 
        id_compra: id_compra, 
        data, 
        meio_pagamento: meio_pagamento, 
        valor, 
        id_documento_comprovante: id_documento_comprovante, 
    } = req.body;

    const result = await updateComrpaById(id ,id_compra, data, meio_pagamento, valor, id_documento_comprovante);
    res.status(200).json(result);
}

module.exports = {
    httpGetAllComprasPagamentos,
    httpGetComprasPagamentosById,
    httpPostComprasPagamentos,
    httpPutCompraById
}