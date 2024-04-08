const { Op } = require('sequelize');
const FornecedorContato = require('./fornecedor-contato.sequelize');

async function createFornecedorContato(contato) {

    try {

        return await FornecedorContato.create(contato);

    } catch (error) {
        throw new Error(error);
    }

}

async function getAllFornecedorContatos(idFornecedorFirst, idFornecedorLast) {
    try {
        return await FornecedorContato.findAll({
            where: {
                id_fornecedor: {
                    [Op.between]: [idFornecedorFirst, idFornecedorLast]
                }
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

async function getFornecedorContatoById(id) {

    try {

        return await FornecedorContato.findByPk(id) || null;

    } catch (error) {
        throw new Error(error);
    }

}

async function updateFornecedorContato(id, nome, celular, cargo) {

    try {

        await FornecedorContato.update({ nome, celular, cargo }, { where: { id } });
        return await FornecedorContato.findByPk(id);

    } catch (error) {
        throw new Error(error);
    }

}

async function deleteFornecedorContato(id) {

    try {

        return await FornecedorContato.destroy({ where: { id } });

    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    createFornecedorContato,
    getAllFornecedorContatos,
    getFornecedorContatoById,
    updateFornecedorContato,
    deleteFornecedorContato
}