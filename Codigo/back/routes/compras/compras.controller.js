const compra = require('../../models/compras/compra.model');

async function httpGetAllCompras(req, res){
    const resultado = await compra.httpGetAllCompras();
    return res.status(200).json(resultado);
}


async function httpGetCompraByID(req, res){
    const id = req.params.id;
    const resultado = await compra.httpGetCompraById(id);
    return res.status(200).json(resultado);
}

async function httpPostCompra(req, res){
    const body = req.body

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

    const data = await compra.httpPostCompra(
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

module. exports = {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
}