const ComprasPagamentos = require('./compras-pagamentos.sequelize');

async function  getAllComprasPagamentos(){
    try {
       return await ComprasPagamentos.findAll();
    } catch (error) {
        throw new Error(`Erro ao obter todos os pagamentos: ${error.message}`);
    }
    
}

async function getComprasPagamentosById(id){
    try {
        const comprasPagamentos = await ComprasPagamentos.findByPk(id);
        if (!comprasPagamentos) {
            throw new Error(`${id}`);
        }
        return comprasPagamentos;
    } catch (error) {
        throw new Error(`Erro ao obter pagamento por id: ${error.message}`);
    }
}

async function postComprasPagamentos(
    id_compra, 
    data, 
    meio_pagamento, 
    valor, 
    id_documento_comprovante
){  
    try{
        const compra =  ComprasPagamentos.create({
            id_compra,
            data,
            meio_pagamento,
            valor,
            id_documento_comprovante,
        });

        return compra;
    }catch(error){
        throw new Error(`Erro ao criar pagamento: ${error.message}`);
    }

}



async function postManyComprasPagamentos(pagamentos){  
    try{
        return await ComprasPagamentos.bulkCreate(pagamentos);

    }catch(error){
        throw new Error(`Erro ao criar pagamento: ${error.message}`);
    }

}


async function updateCompraPagamentoById(
    id,    
    id_compra, 
    data, 
    meio_pagamento, 
    valor, 
    id_documento_comprovante
){
    try{
        await ComprasPagamentos.update({
                id_compra,
                data,
                meio_pagamento,
                valor,
                id_documento_comprovante,
            },
            {
                where: {id}
            }
        );
        return await getComprasPagamentosById(id);
    }catch(error){
        throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
    }
 }

async function deleteCompraPagamentoById(idPagamento){
    try{
        return await ComprasPagamentos.destroy({
            where: {
                id: idPagamento
            }
        })
    }catch(error){
        throw new Error(`Erro ao deletar pagamento ${idPagamento}`);
    }
}


module.exports = {
    getAllComprasPagamentos,
    getComprasPagamentosById,
    postComprasPagamentos,
    updateCompraPagamentoById,
    postManyComprasPagamentos,
    deleteCompraPagamentoById
}