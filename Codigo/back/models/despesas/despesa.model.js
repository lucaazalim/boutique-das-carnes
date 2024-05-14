const { Op } = require('sequelize');
const Despesa = require('./despesa.sequelize');

async function createDespesa(id_categoria, id_documento_comprovante, data, valor, nome){

    return await Despesa.create({
        id_categoria,   id_documento_comprovante,   data,   valor, nome
    });
    
}


async function getAllDespesas(offset, limit, searchCategoria, searchNome, startOfDateRange, endOfDateRange){

    var options = {};

    //filtering
    if (searchCategoria || searchNome || (startOfDateRange && endOfDateRange)) {

        options.where = {}; 

        if (searchCategoria) {
            options.where["id_categoria"] = { [Op.eq]: `%${searchCategoria}%` };
        }
        
        if (searchNome) {
            options.where["nome"] = { [Op.like]: `%${searchNome}%` };
        }
        
        if (startOfDateRange && endOfDateRange) {
            options.where["data"] = {
                [Op.and]: {
                    [Op.gte]: startOfDateRange,
                    [Op.lte]: endOfDateRange
                }
            };
        }
        

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