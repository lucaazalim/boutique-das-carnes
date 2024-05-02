const {
    createCliente,
    getClienteById,
    getAllClientes,
    updateCliente,
    deleteCliente
} = require('../../models/clientes/cliente.model');

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

    if(!data){
        res.status(404).json({erro: 'Cliente não encontrado'});
    }else{
        res.status(200).json(data);
    }

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


async function httpPutClientes(req, res){
    
    const {
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

    const id = req.params.id;

    try{

        const updatedCliente = await updateCliente(        
            id,
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

        res.status(200).json(updatedCliente);

    }catch(error){

        return res.status(500).json({ erro: error.message });

    }
}


async function httpDeleteClientes(req, res){

    const id = req.params.id;

    try{

        await deleteCliente(id);
        res.status(204).end();

    }catch(erro){

        res.status(404).json({error : erro.message});

    }
}   







module.exports = {
    httpPostClientes,
    httpGetByIdClientes,
    httpGetAllClientes,
    httpPutClientes,
    httpDeleteClientes
}