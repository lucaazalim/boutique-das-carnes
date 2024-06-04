const { Op } = require('sequelize');
const Despesa = require('./despesa.sequelize');

async function createDespesa(id_categoria, id_documento_comprovante, data, valor, nome){

    return await Despesa.create({
        id_categoria,   id_documento_comprovante,   data,   valor, nome
    });
    
}


async function getAllDespesas(offset, limit, searchedCategoria, searchNome, startOfDateRange, endOfDateRange){

    var options = {
        offset,
        limit,
        where: {}
    };

    var startDate = startOfDateRange || new Date(1990, 0 , 1);
    var endDate = endOfDateRange || new Date(2100, 11, 30);

    //filtering
    if (searchedCategoria || searchNome || (startDate && endDate)) {

        options.where = {}; 

        if (searchedCategoria) {
            options.where["id_categoria"] = { [Op.eq]: `%${searchedCategoria}%` };
        }
        
        if (searchNome) {
            options.where["nome"] = { [Op.like]: `%${searchNome}%` };
        }
        
        if (startDate && endDate) {
            options.where["data"] = {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        };

    }else {

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