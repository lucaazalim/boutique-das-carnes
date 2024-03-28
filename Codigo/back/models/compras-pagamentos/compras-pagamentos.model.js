const ComprasPagamentos = require('./compras-pagamentos.sequelize');

async function  getAllComprasPagamentos(){
    return await ComprasPagamentos.findAll();
}

async function getComprasPagamentosById(id){
    return await ComprasPagamentos.findByPk(id);
}

async function postComprasPagamentos(
    id_compra, 
    data, 
    meio_pagamento, 
    valor, 
    id_documento_comprovante, 
){
    const compra =  ComprasPagamentos.create({
        id_compra,
        data,
        meio_pagamento,
        valor,
        id_documento_comprovante,
    });

    return compra;
}


module.exports = {
    getAllComprasPagamentos,
    getComprasPagamentosById,
    postComprasPagamentos
}