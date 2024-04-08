const {
    getCompraPesagemById,
    createCompraPesagem,
    updateCompraPesagemById,
    deleteComprasPesagensById
} = require('../../../models/compras/compras-pesagens/compras-pesagens.model');

const {
    getCompraById
} = require('../../../models/compras/compra.model');

async function httpPostCompraPesagem(req, res) {

    const compraId = req.params.id ? +req.params.id : null;

    if (!compraId) {
        return res.status(400).json({ erro: `Id da compra não informado` });
    }

    try {

        const {
            unidades,
            peso
        } = req.body;

        if (await getCompraById(compraId)) {
            const result = await createCompraPesagem(compraId, unidades, peso);
            return res.status(201).json(result);
        } else {
            return res.status(400).json({ erro: `Compra com id ${compraId} não encontrada` });

        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpGetCompraPesagemById(req, res) {

    try {

        const id = req.params.id;
        const result = await getCompraPesagemById(id);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ erro: `Pesagem com id ${id} não encontrada` });
        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpPutCompraPesagemById(req, res) {

    try {

        const id = req.params.id;
        const {
            unidades, peso
        } = req.body;

        const updatedCompraPesagem = await updateCompraPesagemById(id, unidades, peso);

        if (updatedCompraPesagem) {
            return res.status(200).json(updatedCompraPesagem);
        } else {
            return res.status(404).json({ erro: `Pesagem com id ${id} não encontrada` });
        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpDeleteCompraPesagensById(req, res) {

    try {

        const idPesagem = req.params.id;
        const deletedRows = await deleteComprasPesagensById(idPesagem);

        if (deletedRows > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({ erro: `Pesagem com id ${idPesagem} não encontrada` });
        }

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}

module.exports = {
    httpPostCompraPesagem,
    httpGetCompraPesagemById,
    httpPutCompraPesagemById,
    httpDeleteCompraPesagensById
};
