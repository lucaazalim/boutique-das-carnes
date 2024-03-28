const {getAllCompras, getCompraById, postCompra, updateCompraById} = require('../../models/compras/compra.model');
const Compra = require('../../models/compras/compra.sequelize');


async function httpGetAllCompras(req, res){
    const resultado = await getAllCompras();
    return res.status(200).json(resultado);
}


async function httpGetCompraByID(req, res){
    const id = req.params.id;
    const resultado = await getCompraById(id);
    return res.status(200).json(resultado);
}

async function httpPostCompra(req, res){

    const { 
        idFornecedor: id_fornecedor, 
        status, 
        unidadesMachos: unidades_macho, 
        unidadeFemea: unidades_femea, 
        precoArroba: preco_arroba, 
        desconto, 
        animaisAbatidos: animais_abatidos, 
        pesoTotalAbate: peso_total_abate, 
        idDocumentoRomaneio: id_documento_romaneio, 
        idDocumentoGta: id_documento_gta, 
        idDocumentoNFCompra: id_documento_nf_compra, 
        idDocumentoNFAbate: id_documento_nf_abate, 
        idDocumentoNFsMatadouro: id_documento_nfs_matadouro, 
        idDocumentoNFRetorno: id_documento_nf_retorno 
    } = req.body;

    const data = await postCompra(
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
    );
    res.status(201).json(data);
}


async function httpPutCompraById(req, res){

    const { 
        idFornecedor: id_fornecedor, 
        status, 
        unidadesMachos: unidades_macho, 
        unidadeFemea: unidades_femea, 
        precoArroba: preco_arroba, 
        desconto, 
        animaisAbatidos: animais_abatidos, 
        pesoTotalAbate: peso_total_abate, 
        idDocumentoRomaneio: id_documento_romaneio, 
        idDocumentoGta: id_documento_gta, 
        idDocumentoNFCompra: id_documento_nf_compra, 
        idDocumentoNFAbate: id_documento_nf_abate, 
        idDocumentoNFsMatadouro: id_documento_nfs_matadouro, 
        idDocumentoNFRetorno: id_documento_nf_retorno 
    } = req.body;

    const idCompra = req.params.id;

    await updateCompraById(
        idCompra,
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
    );

    const compra = await getCompraById(idCompra);
    res.status(201).json(compra);

}

module. exports = {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
    httpPutCompraById,
}