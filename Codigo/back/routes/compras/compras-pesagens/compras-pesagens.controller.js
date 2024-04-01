const { 
    getAllCompraPesagem,
    getCompraPesagemById,
    postCompraPesagem,
    updateCompraPesagemById,
    postManyComprasPesagem,
    deleteComprasPesagensById
} = require('../../../models/compras/compras-pesagens/compras-pesagens.model');

const {
    compraExistOnDb
} = require('../../../models/compras/compra.model');


async function httpGetAllComprasPesagens(req, res) {
    try {
        const result = await getAllCompraPesagem();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function httpGetComprasPesagensById(req, res) {
    try {
        const id = req.params.id;
        const result = await getCompraPesagemById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function httpPostComprasPesagens(req, res) {
    try {
        const { id_compra, unidades, peso } = req.body;
        const result = await postCompraPesagem(id_compra, unidades, peso);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function httpPutCompraPesagensById(req, res) {
    try {
        const id = req.params.id;
        const { id_compra, unidades, peso } = req.body;
        const result = await updateCompraPesagemById(id, id_compra, unidades, peso);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function httpPostManyCompraPesagens(req, res){
    try {
        const idCompra = req.params.idCompra;
        const pesagens = req.body;

        pesagens.pesagem.forEach(pesagem => {
            pesagem.id_compra = idCompra;
        });

        await compraExistOnDb(idCompra);
        const result = await postManyComprasPesagem(pesagens.pesagem);
        return res.status(200).json(result);

    }catch(error){
        return res.status(400).json({error: error.message});
    }
}

async function httpDeleteCompraPesagensById(req, res){
    try{
        const idPesagem = req.params.id;
        const result = await deleteComprasPesagensById(idPesagem);
        if(result){
            res.status(200).json({
                "status": "success",
                "message": "O recurso foi excluído com sucesso."
            });
        }else{
            throw new Error(`Pesagem nao encontrada`);
        }
    }catch(error){
        return res.status(500).json({ erro: error.message });
    }
}

module.exports = {
    httpGetAllComprasPesagens,
    httpGetComprasPesagensById,
    httpPostComprasPesagens,
    httpPutCompraPesagensById,
    httpPostManyCompraPesagens,
    httpDeleteCompraPesagensById
};
