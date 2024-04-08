const {
    getByIdContatos,
    createContato,
    updateContatos,
    deleteContatos
} = require('../../../models/fornecedores/contatos/fornecedor-contato.model');

async function httpPostFornecedorContato(req, res) {

    const id = req.params.id_fornecedor;
    const contato = req.body;

    if (!contato.nome) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    contato.id_fornecedor = id;

    createContato(contato)
        .then(createdContato => {
            res.status(201).json(createdContato);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpGetByIdForncedorContatos(req, res) {

    const id = req.params.id;

    getByIdContatos(id)
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

    updateContatos(id, nome, celular, cargo)
        .then(contato => {
            res.status(200).json(contato);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpDeleteFornecedorContatos(req, res) {

    const { id } = req.params;

    deleteContatos(id)
        .then(() => {
            res.status(204).json({ message: 'Contato deletado com sucesso' });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

module.exports = {
    httpGetByIdForncedorContatos,
    httpPostFornecedorContato,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos
}