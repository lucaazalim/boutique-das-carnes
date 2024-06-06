const {
    getByIdPedidoItem,
    getByIdItem,
    createItem,
    deleteItem
} = require('../../../models/pedidos/item/item.model');

const { checkItem } = require('../../../models/estoque/estoque.model');

async function httpGetByIdPedidoItem(req, res) {
    const { id_pedido } = req.params;

    try {
        const result = await getByIdPedidoItem(id_pedido);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function httpGetByIdItem(req, res) {
    const { id } = req.params;

    try {
        const result = await getByIdItem(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Caso o pedido seja criado é necessario a mudança do estoque
async function httpPostItem(req, res) {
    const pedidoItem = req.body;
    const { quantidade } = pedidoItem;

    try {

        await checkItem(pedidoItem.conjunto, quantidade);

        const result = await createItem(pedidoItem);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function httpDeleteItem(req, res) {
    const { id } = req.params;
    
    try {
        await deleteItem(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    httpGetByIdPedidoItem,
    httpGetByIdItem,
    httpPostItem,
    httpDeleteItem
}