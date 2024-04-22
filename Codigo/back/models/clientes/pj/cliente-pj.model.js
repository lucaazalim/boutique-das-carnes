const { Op } = require('sequelize');
const ClientePJ = require('./cliente-pj.sequelize');

async function createClientePJ(id_cliente, cnpj, razao_social, nome_fantasia){
    try{
        return await ClientePJ.create({
            id_cliente,
            cnpj,
            razao_social,
            nome_fantasia
        })
    }catch(error){
        throw new Error(error);
    }
};

async function checkIfCNPJExists(cnpj) {
    const cliente = await ClientePJ.findOne({
        where: { cnpj }
    });
    return cliente !== null;
}



module.exports = {
    createClientePJ,
    checkIfCNPJExists
}

