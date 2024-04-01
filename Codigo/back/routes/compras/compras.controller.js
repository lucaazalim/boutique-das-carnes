const {getAllCompras, getCompraById, postCompra, updateCompraById} = require('../../models/compras/compra.model');


async function httpGetAllCompras(req, res){
    try{
        const resultado = await getAllCompras();
        return res.status(200).json(resultado);
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
    



async function httpGetCompraByID(req, res){
    const id = req.params.id;
    try {
        const resultado = await getCompraById(id);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(404).json({ erro: error.message });
    }
}

async function httpPostCompra(req, res){

    const { 
        id_fornecedor: id_fornecedor, 
        status, 
        unidades_macho: unidades_macho,     
        unidades_femea: unidades_femea, 
        preco_arroba: preco_arroba, 
        desconto, 
        animais_abatidos: animais_abatidos, 
        peso_total_abate: peso_total_abate, 
        id_documento_romaneio: id_documento_romaneio, 
        id_documento_gta: id_documento_gta, 
        id_documento_nf_compra: id_documento_nf_compra, 
        id_documento_nf_abate: id_documento_nf_abate, 
        id_documento_nfs_matadouro: id_documento_nfs_matadouro, 
        id_documento_nf_retorno: id_documento_nf_retorno 
    } = req.body;

    try{
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
        )
        res.status(201).json(data);
    }catch(error){
        return res.status(404).json({erro: error.message})
    }

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
    try {
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
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }

}

module. exports = {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
    httpPutCompraById,
}