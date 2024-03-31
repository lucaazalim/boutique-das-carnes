const CompraPesagens = require('./compras-pesagens.sequelize');

async function getAllCompraPesagem() {
    try {
        return await CompraPesagens.findAll();
    } catch (error) {
        throw new Error(`Erro ao obter todos as pesagens de compra: ${error.message}`);
    }
}

async function getCompraPesagemById(id) {
    try {
        const compraPesagem = await CompraPesagens.findByPk(id);
        if (!compraPesagem) {
            throw new Error(`Detalhe de compra com o ID ${id} não encontrado`);
        }
        return compraPesagem;
    } catch (error) {
        throw new Error(`Erro ao obter as pesagens de compra por ID: ${error.message}`);
    }
}

async function postCompraPesagem(id_compra, unidades, peso) {
    try {
        const compraPesagem = await CompraPesagens.create({
            id_compra,
            unidades,
            peso,
        });
        return compraPesagem;
    } catch (error) {
        throw new Error(`Erro ao criar a pesagem de compra: ${error.message}`);
    }
}

async function updateCompraPesagemById(id, id_compra, unidades, peso) {
    try {
        await CompraPesagens.update({
            id_compra,
            unidades,
            peso,
        }, {
            where: { id },
        });
        return await getCompraPesagemById(id);
    } catch (error) {
        throw new Error(`Erro ao atualizar a pesagem de compra: ${error.message}`);
    }
}

async function postManyComprasPesagem(pesagens){
    try{
        return await CompraPesagens.bulkCreate(pesagens);
    }catch(error){
        throw new Error(`Erro ao criar a pesagem de compra: ${error.message}`);
    }
}

module.exports = {
    getAllCompraPesagem,
    getCompraPesagemById,
    postCompraPesagem,
    updateCompraPesagemById,
    postManyComprasPesagem
};
