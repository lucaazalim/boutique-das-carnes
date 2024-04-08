const {
    getFornecedorContatoById,
    createFornecedorContato,
    updateFornecedorContato,
    deleteFornecedorContato
} = require('../../../models/fornecedores/contatos/fornecedor-contato.model');

async function httpPostFornecedorContato(req, res) {

    const id = req.params.id_fornecedor;
    const contato = req.body;

    if (!contato.nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    contato.id_fornecedor = id;

    createFornecedorContato(contato)
        .then(createdContato => {
            res.status(201).json(createdContato);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpGetByIdForncedorContatos(req, res) {

    const id = req.params.id;

    getFornecedorContatoById(id)
        .then(contatos => {
            res.status(200).json(contatos);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpPutFornecedorContatos(req, res) {

    const { id } = req.params;
    const { nome, celular, cargo } = req.body;

    updateFornecedorContato(id, nome, celular, cargo)
        .then(contato => {
            res.status(200).json(contato);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpDeleteFornecedorContatos(req, res) {

    const { id } = req.params;

    try {

        const deletedRows = await deleteFornecedorContato(id);

        if (deletedRows > 0) {
            return res.status(204).json();
        } else {
            return res.status(404).json({ message: `Contato com id ${id} não encontrado` });
        }


    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    httpGetByIdForncedorContatos,
    httpPostFornecedorContato,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos
}