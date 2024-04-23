const {
    createCliente,
    getClienteById,
    getAllClientes
} = require('../../models/clientes/clientes.model');

const getPagination = require('../../services/query.service');

async function httpGetAllClientes(req, res){

    const { offset, limit } = getPagination(req.query);
    const search = req.query.search;

    try {

        const data = await getAllClientes(offset, limit, search)
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}

async function httpGetByIdClientes(req, res){
    const id = req.params.id;

    const data = await getClienteById(id);

    if(data == null){
        res.status(404).json({erro: 'Cliente não encontrado'});
    }

    res.status(200).json(data);
}



async function httpPostClientes (req, res) {
    const {
        tipo,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        bairro,
        numero,
        complemento,
        estado,
        cidade,
        ativo,
        notas,
        pessoa
    } = req.body;

    try {

        const createdCliente = await createCliente(
            tipo,
            email,
            telefone,
            celular,
            cep,
            logradouro,
            bairro,
            numero,
            complemento,
            estado,
            cidade,
            ativo,
            notas,
            pessoa
        );

        return res.status(201).json(createdCliente);

    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }

}




module.exports = {
    httpPostClientes,
    httpGetByIdClientes,
    httpGetAllClientes
}