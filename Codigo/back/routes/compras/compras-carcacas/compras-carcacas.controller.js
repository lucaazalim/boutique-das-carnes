const {
    getCompraCarcacaById,
    createCompraCarcaca,
    updateCompraCarcacaById,
    deleteCompraCarcacaById
} = require('../../../models/compras/compras-carcacas/compras-carcacas.model');

const { createEstoque } = require('../../../models/estoque/estoque.model');

const {
    getCompraById
} = require('../../../models/compras/compra.model');

async function httpPostCompraCarcaca(req, res) {

    const compraId = req.params.id ? +req.params.id : null;

    if (!compraId) {
        return res.status(400).json({ erro: `ID da compra não informado` });
    }

    try {

        const {
            sequencial,
            peso_total
        } = req.body;

        if (await getCompraById(compraId)) {
            const result = await createCompraCarcaca(compraId, sequencial, peso_total);
            await createEstoque(result.id);
            return res.status(201).json(result);
        } else {
            return res.status(400).json({ erro: `Compra com id ${compraId} não encontrada` });

        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpGetCompraCarcacaById(req, res) {

    try {

        const id = req.params.id;
        const result = await getCompraCarcacaById(id);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ erro: `Carcaca com id ${id} não encontrada` });
        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpPutCompraCarcacaById(req, res) {

    try {

        const id = req.params.id;
        const {
            sequencial,
            peso_total
        } = req.body;

        const updatedCompraCarcaca = await updateCompraCarcacaById(id, sequencial, peso_total);

        if (updatedCompraCarcaca) {
            return res.status(200).json(updatedCompraCarcaca);
        } else {
            return res.status(404).json({ erro: `Carcaça com id ${id} não encontrada` });
        }

    } catch (error) {

        return res.status(400).json({ error: error.message });

    }

}

async function httpDeleteCompraCarcacaById(req, res) {

    try {

        const idCarcaca = req.params.id;
        const deletedRows = await deleteCompraCarcacaById(idCarcaca);

        if (deletedRows > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({ erro: `Carcaça com id ${idCarcaca} não encontrada` });
        }

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}

module.exports = {
    httpPostCompraCarcaca,
    httpGetCompraCarcacaById,
    httpPutCompraCarcacaById,
    httpDeleteCompraCarcacaById
};
