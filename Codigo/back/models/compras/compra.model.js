const { Model } = require('sequelize');
const Compra = require('./compra.sequelize');

async function getAllCompras(){
    try {
        const compras = await Compra.findAll();
        return compras;
    } catch (error) {
        throw new Error(`Erro ao obter todas as compras: ${error.message}`);
    }

}

async function getCompraById(id){
    try {
        const compra = await Compra.findByPk(id);
        if (!compra) {
            throw new Error(`${id}`);
        }
        return compra;
    } catch (error) {
        throw new Error(`Erro ao obter compra por id: ${error.message}`);
    }
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
    try{
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
    }catch(error){
        throw new Error(`Erro ao criar compra: ${error.message}`);
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
    id_documento_nf_retorno){
    try{
        const compra = await Compra.update({
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
    }catch(error){
        throw new Error(`Erro ao atualizar compra: ${error.message}`);
    }
       
};


module.exports = {
    getAllCompras,
    getCompraById,
    postCompra,
    updateCompraById,
} 