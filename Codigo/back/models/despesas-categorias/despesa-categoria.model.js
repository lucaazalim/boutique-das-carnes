const Despesa = require('../despesas/despesa.sequelize');
const DespesasCategorias = require('./despesa-categoria.sequelize');


async function createDespesasCategoria(
    nome,
    descricao,
    cor){

    return await DespesasCategorias.create({
        nome,  descricao, cor
    });

}

async function getAllDespesasCategorias(offset, limit){

    const options = { offset, limit };

    return await DespesasCategorias.findAll(options);

}

async function getDespesasCategoriasById(id){

    return await DespesasCategorias.findByPk(id);

}


async function updateDespesasCategorias(
    id,
    nome,
    descricao,
    cor){

    await DespesasCategorias.update({
        nome,
        descricao,
        cor
    },
    {
        where: {id}
    });
    
    return await DespesasCategorias.findByPk(id);
    
}

async function deleteDespesaById(id){
    return DespesasCategorias.destroy({where: {id}});
}


module.exports = {
    createDespesasCategoria,
    getAllDespesasCategorias,
    getDespesasCategoriasById,
    updateDespesasCategorias,
    deleteDespesaById
}

