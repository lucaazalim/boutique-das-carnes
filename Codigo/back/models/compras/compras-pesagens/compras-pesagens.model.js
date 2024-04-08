const CompraPesagens = require('./compras-pesagens.sequelize');

async function createCompraPesagem(id_compra, unidades, peso) {

    try {

        return await CompraPesagens.create({
            id_compra,
            unidades,
            peso,
        });

    } catch (error) {
        throw new Error(`Erro ao criar a pesagem: ${error.message}`);
    }

}

async function getCompraPesagemById(id) {
    try {
        return await CompraPesagens.findByPk(id) || null;
    } catch (error) {
        throw new Error(`Erro ao obter as pesagens de compra por ID: ${error.message}`);
    }
}

async function updateCompraPesagemById(id, unidades, peso) {

    try {

        await CompraPesagens.update(
            {
                unidades,
                peso,
            }, {
            where: { id },
        }
        );

        return await getCompraPesagemById(id);

    } catch (error) {

        throw new Error(`Erro ao atualizar a pesagem: ${error.message}`);

    }

}

async function deleteComprasPesagensById(idPesagem) {

    try {

        return CompraPesagens.destroy({
            where: {
                id: idPesagem,
            }
        });

    } catch (error) {
        throw new Error(`Erro ao excluir a pesagem: ${erro.message}`)
    }

}

module.exports = {
    getCompraPesagemById,
    createCompraPesagem,
    updateCompraPesagemById,
    deleteComprasPesagensById
};
