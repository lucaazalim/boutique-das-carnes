const {getAllComprasPagamentos,
     getComprasPagamentosById,
    postComprasPagamentos,
    updateCompraPagamentoById,
    postManyComprasPagamentos,
    deleteCompraPagamentoById
} = require('../../../models/compras/compras-pagamentos/compras-pagamentos.model');

const {
    compraExistOnDb
} = require('../../../models/compras/compra.model');

async function httpGetAllComprasPagamentos(req, res){
    try {
        const result = await getAllComprasPagamentos();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

async function httpGetComprasPagamentosById(req, res){
    try {
        const id = req.params.id;
        const result = await getComprasPagamentosById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

async function httpPostComprasPagamentos(req, res){
    try {
        const { 
            id_compra, 
            data, 
            meio_pagamento, 
            valor, 
            id_documento_comprovante
        } = req.body;

        if(compraExistOnDb(id_compra)){
            const result = await postComprasPagamentos(id_compra, data, meio_pagamento, valor, id_documento_comprovante);
            return res.status(201).json(result);
        }else{
            throw new Error(`O banco de dados nao possue compras com o id: ${id_compra}`);
        }

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}



async function httpPostManyComprasPagamentos(req, res){
    try {
        const idCompra = req.params.idCompra;
        const pagamentos =  req.body;

        pagamentos.pagamento.forEach( pagamento => {
            pagamento.id_compra = idCompra;
        });

        await compraExistOnDb(idCompra);
        const result = await postManyComprasPagamentos(pagamentos.pagamento);
        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

async function httpPutCompraPagamentoById(req, res){
    try {
        const id = req.params.id;
        const { 
            id_compra, 
            data, 
            meio_pagamento, 
            valor, 
            id_documento_comprovante
        } = req.body;
        const result = await updateCompraPagamentoById(id, id_compra, data, meio_pagamento, valor, id_documento_comprovante);
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

async function httpDeletePagamentoById(req, res){
    try{
        const idPagamento = req.params.id;
        const result = await deleteCompraPagamentoById(idPagamento);
        if(result){
            return res.status(200).json({
                "status": "success",
                "message": "O pagamento foi excluído com sucesso."
            });
        }else{
            throw new Error(`Pagamento nao encontrado`);
        }

    }catch(error){
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    httpGetAllComprasPagamentos,
    httpGetComprasPagamentosById,
    httpPostComprasPagamentos,
    httpPutCompraPagamentoById,
    httpPostManyComprasPagamentos,
    httpDeletePagamentoById
}