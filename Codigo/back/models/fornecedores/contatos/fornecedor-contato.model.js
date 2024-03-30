const { Op } = require('sequelize');
const FornecedorContato = require('./fornecedor-contato.sequelize');

async function createFornecedorContatos(contatos) {
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

async function getFornecedorContato(id) {
    const fornecedorContato = await FornecedorContato.findByPk(id);

    if (!fornecedorContato) {
        throw new Error('FornecedorContato não encontrado');
    }

    return fornecedorContato;
}

async function updateFornecedorContato(id, nome, celular, cargo) {
    
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

module.exports = {
    createFornecedorContatos,
    getAllFornecedorContatos,
    getFornecedorContato,
    updateFornecedorContato,
}