const ClientePF = require('./cliente-pf.sequelize');

async function createClientePF(id_cliente, cpf, nome){
    try{
        await ClientePF.create({
            id_cliente,
            cpf,
            nome
        })
    }catch(error){
        throw new Error(error);
    }
};

async function checkIfCPFExists(cpf) { 
    const cliente = await ClientePF.findOne({
        where: { cpf }
    });
    return cliente !== null;
}  

async function updateClientePF(id_cliente, nome){
    await ClientePF.update({
        nome
    }, {
        where: { id_cliente }
    })
}


module.exports = {
    createClientePF,    
    checkIfCPFExists,
    updateClientePF
}