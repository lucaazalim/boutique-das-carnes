const {
    createCompraPagamento,
    getComprasPagamentosById,
    updateCompraPagamentoById,
    deleteCompraPagamentoById
} = require('../../../models/compras/compras-pagamentos/compras-pagamentos.model');

const {
    getCompraById
} = require('../../../models/compras/compra.model');

async function httpPostCompraPagamento(req, res) {

    const compraId = req.params.id ? +req.params.id : null;

    if (!compraId) {
        return res.status(400).json({ erro: `Id da compra não informado` });
    }

    try {

        const {
            data,
            meio_pagamento,
            valor,
            id_documento_comprovante
        } = req.body;

        if (await getCompraById(compraId)) {
            const result = await createCompraPagamento(compraId, data, meio_pagamento, valor, id_documento_comprovante);
            return res.status(201).json(result);
        } else {
            return res.status(400).json({ erro: `Compra com id ${compraId} não encontrada` });
        }

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}

async function httpGetCompraPagamentoById(req, res) {

    try {

        const id = req.params.id;
        const result = await getComprasPagamentosById(id);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ erro: `Pagamento com id ${id} não encontrado` });
        }

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }

}

async function httpPutCompraPagamentoById(req, res) {

    try {

        const id = req.params.id;
        const {
            id_compra,
            data,
            meio_pagamento,
            valor,
            id_documento_comprovante
        } = req.body;

        const updatedCompraPagamento = await updateCompraPagamentoById(id, id_compra, data, meio_pagamento, valor, id_documento_comprovante);

        if (updatedCompraPagamento) {
            res.status(200).json(updatedCompraPagamento);
        } else {
            res.status(404).json({ erro: `Pagamento com id ${id} não encontrado` });
        }


    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

async function httpDeletePagamentoById(req, res) {

    try {

        const idPagamento = req.params.id;
        const deletedRows = await deleteCompraPagamentoById(idPagamento);

        if (deletedRows > 0) {
            return res.status(204).json();
        } else {
            return res.status(404).json({ erro: `Pagamento com id ${idPagamento} não encontrado` });
        }

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    httpPostCompraPagamento,
    httpGetCompraPagamentoById,
    httpPutCompraPagamentoById,
    httpDeletePagamentoById
}