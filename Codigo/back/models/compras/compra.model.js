const { Model } = require('sequelize');
const { Op } = require('sequelize');

const Compra = require('./compra.sequelize');

async function createCompra(
    id_fornecedor,
    status,
    unidades_macho,
    unidades_femea,
    preco_arroba,
    desconto,
    animais_abatidos,
    peso_total_abate,
    id_documento_romaneio,
    id_documento_gta,
    id_documento_nf_compra,
    id_documento_nf_abate,
    id_documento_nfs_matadouro,
    id_documento_nf_retorno
) {
    try {
        const compra = Compra.create({
            id_fornecedor,
            status,
            unidades_macho,
            unidades_femea,
            preco_arroba,
            desconto,
            animais_abatidos,
            peso_total_abate,
            id_documento_romaneio,
            id_documento_gta,
            id_documento_nf_compra,
            id_documento_nf_abate,
            id_documento_nfs_matadouro,
            id_documento_nf_retorno
        });
        return compra
    } catch (error) {
        throw new Error(`Erro ao criar compra: ${error.message}`);
    }

}

async function getAllCompras(offset, limit) {
    try {
        const compras = await Compra.findAll({
            offset: offset,
            limit: limit,
        });
        return compras;
    } catch (error) {
        throw new Error(`Erro ao obter todas as compras: ${error.message}`);
    }

}

async function getCompraById(id) {
    try {
        return await Compra.findByPk(id) || null;
    } catch (error) {
        throw new Error(`Erro ao obter compra por id: ${error.message}`);
    }
}

async function updateCompraById(
    id,
    id_fornecedor,
    status,
    unidades_macho,
    unidades_femea,
    preco_arroba,
    desconto,
    animais_abatidos,
    peso_total_abate,
    id_documento_romaneio,
    id_documento_gta,
    id_documento_nf_compra,
    id_documento_nf_abate,
    id_documento_nfs_matadouro,
    id_documento_nf_retorno) {
    try {

        await Compra.update(
            {
                id_fornecedor,
                status,
                unidades_macho,
                unidades_femea,
                preco_arroba,
                desconto,
                animais_abatidos,
                peso_total_abate,
                id_documento_romaneio,
                id_documento_gta,
                id_documento_nf_compra,
                id_documento_nf_abate,
                id_documento_nfs_matadouro,
                id_documento_nf_retorno
            },
            {
                where: { id }
            });

        return await getCompraById(id);

    } catch (error) {
        throw new Error(`Erro ao atualizar compra: ${error.message}`);
    }

};


module.exports = {
    createCompra,
    getAllCompras,
    getCompraById,
    updateCompraById
} 