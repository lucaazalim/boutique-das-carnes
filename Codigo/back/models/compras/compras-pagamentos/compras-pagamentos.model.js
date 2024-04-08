const ComprasPagamentos = require('./compras-pagamentos.sequelize');

async function getAllComprasPagamentos() {
    try {
        return await ComprasPagamentos.findAll();
    } catch (error) {
        throw new Error(`Erro ao obter todos os pagamentos: ${error.message}`);
    }

}

async function getComprasPagamentosById(id) {
    try {
        return await ComprasPagamentos.findByPk(id) || null;
    } catch (error) {
        throw new Error(`Erro ao obter pagamento por id: ${error.message}`);
    }
}

async function createCompraPagamento(
    id_compra,
    data,
    meio_pagamento,
    valor,
    id_documento_comprovante
) {

    try {

        return await ComprasPagamentos.create({
            id_compra,
            data,
            meio_pagamento,
            valor,
            id_documento_comprovante,
        });

    } catch (error) {
        throw new Error(`Erro ao criar pagamento: ${error.message}`);
    }

}



async function postManyComprasPagamentos(pagamentos) {
    try {
        return await ComprasPagamentos.bulkCreate(pagamentos);

    } catch (error) {
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
) {
    try {

        await ComprasPagamentos.update(
            {
                id_compra,
                data,
                meio_pagamento,
                valor,
                id_documento_comprovante,
            },
            {
                where: { id }
            }
        );

        return await getComprasPagamentosById(id);

    } catch (error) {
        throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
    }
}

async function deleteCompraPagamentoById(id) {
    try {
        return await ComprasPagamentos.destroy({
            where: {
                id
            }
        });
    } catch (error) {
        throw new Error(`Erro ao deletar pagamento ${id}`);
    }
}


module.exports = {
    getAllComprasPagamentos,
    getComprasPagamentosById,
    createCompraPagamento,
    updateCompraPagamentoById,
    postManyComprasPagamentos,
    deleteCompraPagamentoById
}