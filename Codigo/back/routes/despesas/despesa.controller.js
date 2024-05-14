const {
    createDespesa,
    getAllDespesas,
    getDespesaById,
    updateDespesaById,
    deleteDespesaById
} = require('../../models/despesas/despesa.model');
const { getFornecedorById } = require('../../models/fornecedores/fornecedor.model');

const getPagination = require('../../services/query.service');

async function httpPostDespesas(req, res){
    const {
        id_categoria,
        id_documento_comprovante,
        data,
        valor,
        nome
    } = req.body;

    try{

        const createdDespesa = await createDespesa(
            id_categoria,
            id_documento_comprovante,
            data,
            valor,
            nome);

            res.status(201).json(createdDespesa);

    }catch(error){

        return res.status(404).json({ erro: error.message })

    }
}


async function httpGetAllDespesas(req, res){


    try{

        const search = req.query.search;
        const { offset, limit } = getPagination(req.query);

        const data = await getAllDespesas(offset, limit, search);

        return res.status(200).json(data);

    }catch(error){
        return res.status(500).json({error: error.message});
    }

}


async function httpGetByIdClientes(req, res){

    try{

        const id = req.params.id;
        const data = await getDespesaById(id);

        if(!data){

            res.status(404).json({erro: 'Despesa não encontrado'});

        }else{

            res.status(200).json(data);

        }
    

    }catch(error){
        return res.status(500).json(data);
    }
}


async function httpPutDespesas(req, res){
    const id = req.params.id;

    const {
        id_categoria,
        id_documento_comprovante,
        data,
        valor,
        nome
    } = req.body;

    try{

        const updatedFornecedor = await updateDespesaById(
            id,
            id_categoria,
            id_documento_comprovante,
            data,
            valor,
            nome
        );
        
        if(updatedFornecedor){

            return res.status(200).json(updatedFornecedor);

        }else{

            return res.status(404).json({error: `Despesa com id ${id} não encontrado`});

        }
        

    }catch(error){

        return res.status(500).json({error: error.message});
    }



}


async function httpDeleteDespesa(req, res){
    const id = req.params.id;

    try{

        const result =  await getDespesaById(id);

        if(!result){
            return res.status(404).json({error: 'Despesa não encontrado'})
        }

        await deleteDespesaById(id);
        return res.status(204).end();
        
    }catch(error){

        return res.status(500).json({error: error.message});

    }


}


module.exports = {
    httpPostDespesas,
    httpGetAllDespesas,
    httpGetByIdClientes,
    httpPutDespesas,
    httpDeleteDespesa,
}