const {
    createPedido,
    getAllPedido,
    getByIdPedido,
    updatePedido,
    deletePedido,
} = require('../../models/pedidos/pedido.model');

const { createPedidoItem } = require('../../models/pedidos/item/item.model');
const { checkItem, updateEstoque } = require('../../models/estoque/estoque.model');

const { CONJUNTOS } = require('../../constants/pedido.constant');

async function httpGetAllPedido(req, res) {
    try {
        const result = await getAllPedido();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function httpGetByIdPedido(req, res) {
    const id = req.params.id;

    try {
        const result = await getByIdPedido(id);
        if (!result) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function httpPostPedido(req, res) {

    /**
     * Somente pode ser criado um pedido se o estoque id_pedido_item  existir
     * campo vazio (null) no banco de dados - necessário verificar se o campo está vazio primeiro
     */

    const pedido = req.body;
    // verificar se no payload também tem o campo conjunto
    const { 
        id_cliente, 
        id_compra, 
        conjunto,
        letra,
        quantidade,
        peso,
        preco } = pedido;    

    if ( !id_cliente || !id_compra) {
        return res.status(400).json({ message: 'Campos: id_cliente e id_compra são obrigatório.' });
    }

    try {

        // precissa finalizar o função caso o item não exista
        checkItem(conjunto);

        const resultPedido = await createPedido(pedido);

        const { id } = resultPedido;

        console.log("ID: ", id)

        const item = {
            id_pedido: id,
            conjunto,
            letra,
            quantidade,
            peso,
            preco
        }

        // Criação do item do pedido com id_pedido
        const resultItemPedido = await createPedidoItem(item);

        // Criação do item pedido com id_pedido_item
        let itens = [];
        const id_pedido_item = { id_pedido_item: resultItemPedido.id };

        itens = CONJUNTOS.find(conjunto => conjunto.nome === item.conjunto).itens;

        for (let tipo of itens) {
            const updated = await updateEstoque( id_pedido_item, tipo);
            console.log("UPDATED: ", updated);
        }

        const result = {
            ...resultPedido.dataValues,
            ...resultItemPedido.dataValues
        }

        return res.status(201).json(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function httpPutPedido(req, res) {
    const id = req.params.id;
    const pedido = req.body;
    const { id_cliente, id_compra } = pedido;

    if ( !id_cliente || !id_compra) {
        return res.status(400).json({ message: 'Campos: id_cliente e id_compra são obrigatório.' });
    }

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
        return res.status(204).json({ message: 'Pedido deletado com sucesso.'});
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