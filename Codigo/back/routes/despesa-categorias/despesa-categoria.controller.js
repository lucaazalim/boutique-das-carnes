const {
    getAllDespesasCategorias,
    getDespesasCategoriasById,
    createDespesasCategoria,
    updateDespesasCategorias,
    deleteDespesaById
} = require('../../models/despesas-categorias/despesa-categoria.model');

const getPagination = require('../../services/query.service');

async function httpGetAllDespesasCategorias(req, res){

    try{

        const { offset, limit } = getPagination(req.query);
        const data = await getAllDespesasCategorias(offset, limit);
    
        return res.status(200).json(data);
        
    }catch(error){

        return res.status(500).json({erro: error.message});

    }

}

async function httpGetByIdDespesasCategorias(req, res){

    try{

        const id = req.params.id;
        const findedDespesaCategoria = await getDespesasCategoriasById(id);
    
        if(!findedDespesaCategoria){

            return res.status(404).json({erro: 'Despesa não encontrado'});
        }

        return res.status(200).json(findedDespesaCategoria);
        
    }catch(error){

        return res.status(500).json({erro: error.message});

    }

}

async function httpPostDespesasCategorias(req, res){

    try{

        const {
            nome,
            descricao,
            cor,
        } = req.body;

        const createdDespesaCategoria = await createDespesasCategoria(nome, descricao, cor);

        return res.status(201).json(createdDespesaCategoria);

    }catch(error){

        res.status(404).json({erro: error.message});

    }

}

async function httpPutDespesasCategorias(req, res){

    try{

        const {
            nome,
            descricao,
            cor,
        } = req.body;

        const id = req.params.id;
        const updatedDespesasCategorias = await updateDespesasCategorias(id,nome, descricao, cor);

        if(updatedDespesasCategorias){

            return res.status(200).json(updatedDespesasCategorias);

        }else{

            return res.status(404).json({error: `Despesa com id ${id} não encontrado`});

        }
    }catch(error){

        return res.status(500).json({error: error.message});

    }   


}

async function httpDeleteDespesasCategorias(req, res){

    const id = req.params.id;

    try{

        const result =  await getDespesasCategoriasById(id);

        if(!result){
            return res.status(404).json({error: 'Despesa Categoria não encontrado'})
        }

        await deleteDespesaById(id);
        return res.status(204).end();
        
    }catch(error){

        return res.status(500).json({error: error.message});

    }
}


module.exports = {

    httpGetAllDespesasCategorias,
    httpPostDespesasCategorias,
    httpGetByIdDespesasCategorias,
    httpPutDespesasCategorias,
    httpDeleteDespesasCategorias
    
}