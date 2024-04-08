const {
    getAllCompras,
    getCompraById,
    createCompra,
    updateCompraById
} = require('../../models/compras/compra.model');

const {
    getFornecedorById
} = require('../../models/fornecedores/fornecedor.model');

const getPagination = require('../../services/query.service');

async function httpPostCompra(req, res) {

    const {
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
    } = req.body;

    try {

        if (!await getFornecedorById(id_fornecedor)) {
            return res.status(400).json({ erro: `Fornecedor com id ${id_fornecedor} não encontrado` });
        }

        const data = await createCompra(
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

        const createdCompra = await getCompraById(data.id);

        res.status(201).json(createdCompra);

    } catch (error) {
        return res.status(404).json({ erro: error.message })
    }

}

async function httpGetAllCompras(req, res) {

    const { offset, limit } = getPagination(req.query);

    try {

        const resultado = await getAllCompras(offset, limit);
        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

async function httpGetCompraByID(req, res) {

    try {

        const id = req.params.id;
        const result = await getCompraById(id);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ erro: `Compra com id ${id} não encontrada` });
        }

    } catch (error) {
        return res.status(404).json({ erro: error.message });
    }

}

async function httpPutCompraById(req, res) {

    const {
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
    } = req.body;

    const compraId = req.params.id;

    try {

        const updatedCompra = await updateCompraById(
            compraId,
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

        if (updatedCompra) {
            res.status(200).json(updatedCompra);
        } else {
            res.status(404).json({ erro: `Compra com id ${compraId} não encontrada` });
        }

    } catch (error) {
        res.status(400).json({ erro: error.message });
    }

}

module.exports = {
    httpGetAllCompras,
    httpGetCompraByID,
    httpPostCompra,
    httpPutCompraById,
}