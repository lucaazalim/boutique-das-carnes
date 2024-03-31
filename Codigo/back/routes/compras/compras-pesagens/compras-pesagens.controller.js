const { getAllCompraPesagem, getCompraPesagemById, postCompraPesagem, updateCompraPesagemById } = require('../../../models/compras/compras-pesagens/compras-pesagens.model');

async function httpGetAllComprasPesagens(req, res) {
    try {
        const result = await getAllCompraPesagem();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function httpGetComprasPesagensById(req, res) {
    try {
        const id = req.params.id;
        const result = await getCompraPesagemById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function httpPostComprasPesagens(req, res) {
    try {
        const { id_compra, unidades, peso } = req.body;
        const result = await postCompraPesagem(id_compra, unidades, peso);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function httpPutCompraPesagensById(req, res) {
    try {
        const id = req.params.id;
        const { id_compra, unidades, peso } = req.body;
        const result = await updateCompraPesagemById(id, id_compra, unidades, peso);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    httpGetAllComprasPesagens,
    httpGetComprasPesagensById,
    httpPostComprasPesagens,
    httpPutCompraPesagensById
};
