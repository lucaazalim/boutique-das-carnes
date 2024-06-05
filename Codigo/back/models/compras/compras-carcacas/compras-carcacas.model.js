const CompraCarcacas = require('./compras-carcacas.sequelize');

async function createCompraCarcaca(id_compra, sequencial, peso_total) {

    try {

        return await CompraCarcacas.create({
            id_compra,
            sequencial,
            peso_total
        });

    } catch (error) {
        throw new Error(`Erro ao criar a carcaça: ${error.message}`);
    }

}

async function getCompraCarcacaById(id) {
    try {
        return await CompraCarcacas.findByPk(id) || null;
    } catch (error) {
        throw new Error(`Erro ao obter as carcaças de compra por ID: ${error.message}`);
    }
}

async function updateCompraCarcacaById(id, sequencial, peso_total) {

    try {

        await CompraCarcacas.update(
            {
                sequencial,
                peso_total
            }, {
            where: { id },
        }
        );

        return await getCompraCarcacaById(id);

    } catch (error) {

        throw new Error(`Erro ao atualizar a carcaça: ${error.message}`);

    }

}

async function deleteCompraCarcacaById(idCarcaca) {

    try {

        return CompraCarcacas.destroy({
            where: {
                id: idCarcaca,
            }
        });

    } catch (error) {
        throw new Error(`Erro ao excluir a carcaça: ${erro.message}`)
    }

}

module.exports = {
    getCompraCarcacaById,
    createCompraCarcaca,
    updateCompraCarcacaById,
    deleteCompraCarcacaById
};
