const { Op } = require('sequelize');
const Despesa = require('./despesa.sequelize');

async function createDespesa(id_categoria, id_documento_comprovante, data, valor, nome){

    return await Despesa.create({
        id_categoria,   id_documento_comprovante,   data,   valor, nome
    });
    
}


async function getAllDespesas(offset, limit, search = null){

    var options = {};


    if (search) {

        options = {
            where: {
                [Op.or]: [
                    { 'id': { [Op.like]: `%${search}%` } },
                    { 'id_categoria': { [Op.like]: `%${search}%` } },
                    { 'nome': { [Op.like]: `%${search}%` } },
                ]
            }
        };

    } else {

        options = { offset, limit };

    }

    const despesas = await Despesa.findAll(options);
    return despesas;

}

async function getDespesaById(id){

    return despesa = await Despesa.findByPk(id)

}

async function updateDespesaById(
    id,
    id_categoria,   
    id_documento_comprovante,   
    data,   
    valor, 
    nome){

    await Despesa.update({
        id_categoria,
        id_documento_comprovante,
        data,
        valor,
        nome
    },
    {
        where: {id}
    });

    return await Despesa.findByPk(id);
}


async function deleteDespesaById(id){
    return Despesa.destroy({where: {id}})
}


module.exports = {
    
    createDespesa,
    getAllDespesas,
    getDespesaById,
    updateDespesaById,
    deleteDespesaById,

}