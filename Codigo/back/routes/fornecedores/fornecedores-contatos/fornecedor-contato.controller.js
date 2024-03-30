const {
    getAllContatos,
    createContatos,
    updateContatos,
    deleteContatos
} = require('../../../models/fornecedores/contatos/fornecedor-contato.model');


async function httpGetAllFornecedorContatos(req, res) {
    
    getAllContatos()
        .then(contatos => {
            res.status(200).json(contatos);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

async function httpPostFornecedorContatos(req, res) {
        
    const id = req.params.idFornecedor;
    const contatos = req.body;

    contatos.contato.forEach(contato => {
        contato.id_fornecedor = id;
    });

    createContatos(contatos.contato)
        .then(contatos => {
            res.status(201).json(contatos);
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
    httpGetAllFornecedorContatos,
    httpPostFornecedorContatos,
    httpPutFornecedorContatos,
    httpDeleteFornecedorContatos
}