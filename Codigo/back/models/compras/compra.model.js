const { Model } = require('sequelize');
const Compra = require('./compra.sequelize');

async function getAllCompras(){
    return await Compra.findAll();
}

async function getCompraById(id){
    return await Compra.findByPk(id);
}

async function postCompra(
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
){
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
    id_documento_nf_retorno){
        
    return await Compra.update({
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
    })
};


module.exports = {
    getAllCompras,
    getCompraById,
    postCompra,
    updateCompraById,
} 