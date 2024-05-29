const {
    createPedido,
    getAllPedido,
    getByIdPedido,
    updatePedido,
    deletePedido,
} = require('../../models/pedidos/pedido.model');

const getPagination = require('../../services/query.service');

async function httpGetAllPedido(req, res) {
    try {

        const { offset, limit } = getPagination(req.query);

        const result = await getAllPedido(offset, limit);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function httpGetByIdPedido(req, res) {
    const id = req.params.id;

    try {
        const result = await getByIdPedido(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function httpPostPedido(req, res) {

    const pedido = req.body;

    try {

        const resultPedido = await createPedido(pedido);

        return res.status(201).json(resultPedido);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function httpPutPedido(req, res) {
    const id = req.params.id;
    const pedido = req.body;

    try {
        const result = await updatePedido(id, pedido);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

async function httpDeletePedido(req, res) {
    const id = req.params.id;

    try {
        await deletePedido(id);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    httpGetAllPedido,
    httpGetByIdPedido,
    httpPostPedido,
    httpPutPedido,
    httpDeletePedido,
}