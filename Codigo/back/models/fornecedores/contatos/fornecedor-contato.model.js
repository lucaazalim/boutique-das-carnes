const { Op } = require('sequelize');
const FornecedorContato = require('./fornecedor-contato.sequelize');

async function createContatos(contatos) {
    try {
        return await FornecedorContato.bulkCreate(contatos);
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllFornecedorContatos(idFornecedorFirt, idFornecedorLast) {
    try {
        return await FornecedorContato.findAll({
            where: {
                id_fornecedor: {
                    [Op.between]: [idFornecedorFirt, idFornecedorLast]
                }
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

async function getByIdContatos(id) {
    const fornecedorContato = await FornecedorContato.findByPk(id);

    if (!fornecedorContato) {
        throw new Error('FornecedorContato não encontrado');
    }

    return fornecedorContato;
}

async function updateContatos(id, nome, celular, cargo) {
    
    try {

        const fornecedorContato = await FornecedorContato.findByPk(id);

        if (!fornecedorContato) {
            throw new Error('FornecedorContato não encontrado');
        }

        await FornecedorContato.update({
            nome,
            celular,
            cargo
        }, {
            where: {
                id
            }
        })

        const fornecedorContatoAtualizado = await FornecedorContato.findByPk(id);

        return fornecedorContatoAtualizado;
    } catch (error) {
        throw new Error(error);
    }
    
}

async function getAllContatos() {
    try {
        return await FornecedorContato.findAll();
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteContatos(id) {

    try {
        const fornecedorContato = await FornecedorContato.findByPk(id);

        if (!fornecedorContato) {
            throw new Error('FornecedorContato não encontrado');
        }

        await FornecedorContato.destroy({
            where: {
                id
            }
        });

        return fornecedorContato;
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    createContatos,
    getAllFornecedorContatos,
    getByIdContatos,
    updateContatos,
    getAllContatos,
    deleteContatos
}