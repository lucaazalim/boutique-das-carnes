const Cliente = require('./cliente.sequelize');
const { Op } = require('sequelize');

const {
    createClientePJ,
    checkIfCNPJExists,
    updateClientePJ,
} = require('./pj/cliente-pj.model');

const {
    createClientePF,
    checkIfCPFExists,
    updateClientePF,
} = require('./pf/cliente-pf.model');



async function getAllClientes(offset, limit, search = null) {

    var options = {};

    if (search) {

        options = {
            where: {
                [Op.or]: [
                    { '$pf.cpf$': { [Op.like]: `${search}%` } },
                    { '$pf.nome$': { [Op.like]: `%${search}%` } },
                    { '$pj.cnpj$': { [Op.like]: `${search}%` } },
                    { '$pj.razao_social$': { [Op.like]: `%${search}%` } },
                    { '$pj.nome_fantasia$': { [Op.like]: `%${search}%` } },
                ]
            },
        }

    } else {

        options = { offset, limit };

    }

    const clientes = await Cliente.findAll(options);
    clientes.forEach(rearrangePessoa);
    return clientes

}



async function getClienteById(id) {

    const cliente = await Cliente.findByPk(id);

    if (cliente) {
        rearrangePessoa(cliente);
    }

    return cliente;
}



async function createCliente(
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
    pessoa) {

    if (!pessoa) {
        throw new Error('Pessoa não informada');
    }

    if (pessoa) {

        if (tipo === 'PF') {

            if (!pessoa.nome || !pessoa.cpf) {
                throw new Error('Nome e CPF são obrigatórios para pessoa física');
            }

            pessoa.cpf = pessoa.cpf.replace(/\D/g, '');

        } else if (tipo === 'PJ') {

            if (!pessoa.razao_social || !pessoa.cnpj) {
                throw new Error('Razão social e CNPJ são obrigatórios para pessoa jurídica');
            }

            pessoa.cnpj = pessoa.cnpj.replace(/\D/g, '');

        }

    }

    if (tipo === 'PF' && await checkIfCPFExists(pessoa.cpf)) {
        throw new Error('CPF já cadastrado');
    } else if (tipo === 'PJ' && await checkIfCNPJExists(pessoa.cnpj)) {
        throw new Error('CNPJ já cadastrado');
    }

    const createdCliente = await Cliente.create({
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
        notas
    });

    if (tipo === 'PF') {
        await createClientePF(createdCliente.id, pessoa.cpf, pessoa.nome);
    } else if (tipo === 'PJ') {
        await createClientePJ(createdCliente.id, pessoa.cnpj, pessoa.razao_social, pessoa.nome_fantasia)
    }

    const cliente = await Cliente.findByPk(createdCliente.id);

    rearrangePessoa(cliente);

    return cliente;

}


async function updateCliente(
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
    pessoa) {

    await Cliente.update({
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
    },
        {
            where: { id }
        });


    var cliente = await Cliente.findByPk(id);

    if (!cliente)
        throw Error('Cliente não encontrado');

    if (pessoa) {

        if (cliente.tipo === 'PF' && pessoa.nome) {

            await updateClientePF(id, pessoa.nome);

        }

        else if (cliente.tipo === 'PJ' && (pessoa.razao_social || pessoa.nome_fantasia)) {

            await updateClientePJ(id, pessoa.nome_fantasia, pessoa.razao_social);

        }

    }

    cliente = await Cliente.findByPk(id);

    rearrangePessoa(cliente);

    return cliente;
}



async function deleteCliente(id) {
    const cliente = await Cliente.findByPk(id);

    if (!cliente)
        throw new Error('Cliente não encontrado');


    await Cliente.destroy({ where: { id } });

}


function rearrangePessoa(cliente) {

    const { dataValues } = cliente;
    dataValues.pessoa = dataValues.pf ? dataValues.pf : dataValues.pj;
    delete dataValues.pessoa.dataValues.id_cliente;
    delete dataValues.pf;
    delete dataValues.pj;

}

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
}