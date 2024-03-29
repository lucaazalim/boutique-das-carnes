const FornecedorContato = require('./fornecedor-contato.sequelize');

async function createFornecedorContato(id_fornecedor, nome, celular, cargo) {
    try {
        return await FornecedorContato.create({
            id_fornecedor,
            nome,
            celular,
            cargo
        });
    } catch (error) {
        throw new Error(error);
    }
}

async function getFornecedorContatosByIdFornecedor(id_fornecedor) {
    try {
        return await FornecedorContato.findAll({
            where: {
                id: id_fornecedor
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
    createFornecedorContato,
    getFornecedorContatosByIdFornecedor,
    getFornecedorContato,
    updateFornecedorContato,
}