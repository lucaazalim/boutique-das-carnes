const {
    createPedidoItem,
    getAllPedidoItem,
    getByIdPedidoItem,
    deletePedidoItem,
} = require('../../../models/pedidos/item/item.model');

const { checkItem } = require('../../../models/estoque/estoque.model');

async function httpGetAllPedidoItem(req, res) {
    try {
        const result = await getAllPedidoItem();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function httpGetByIdPedidoItem(req, res) {
    const { id } = req.params;

    try {
        const result = await getByIdPedidoItem(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Caso o pedido seja criado é necessario a mudança do estoque
async function httpPostPedidoItem(req, res) {
    const pedidoItem = req.body;

    try {

        await checkItem(pedidoItem.conjunto);

        const result = await createPedidoItem(pedidoItem);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function httpDeletePedidoItem(req, res) {
    const { id } = req.params;
    
    try {
        await deletePedidoItem(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    httpGetAllPedidoItem,
    httpGetByIdPedidoItem,
    httpPostPedidoItem,
    httpDeletePedidoItem,
}