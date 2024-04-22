const {
    createCliente,
    getClienteById
} = require('../../models/clientes/clientes.model');

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

async function httpGetByIdClientes(req, res){
    const id = req.params.id;

    const data = await getClienteById(id);

    if(data == null){
        res.status(404).json({erro: 'Cliente não encontrado'});
    }

    res.status(200).json(data);
}


module.exports = {
    httpPostClientes,
    httpGetByIdClientes
}