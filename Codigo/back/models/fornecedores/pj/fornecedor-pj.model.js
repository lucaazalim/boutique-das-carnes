const { Op } = require('sequelize');
const FornecedorPJ = require('./fornecedor-pj.sequelize');

async function createFornecedorPJ(id_fornecedor, cnpj, razao_social, nome_fantasia) {
    try {
        return await FornecedorPJ.create({
            id_fornecedor,
            cnpj,
            razao_social,
            nome_fantasia
        });
    } catch (error) {
        throw new Error(error);
    }
}

async function getFornecedorPJById(id_fornecedor) {
    try {
        return await FornecedorPJ.findByPk(id_fornecedor);
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllFornecedorPJ(idFornecedorFirst, idFornecedorLast) {
    try {

        const fornecedorPJ = await FornecedorPJ.findAll({
            where: {
                id_fornecedor: {
                    [Op.between]: [idFornecedorFirst, idFornecedorLast]
                }
            }
        });

        if (!fornecedorPJ) {
            throw new Error('FornecedorPJ não encontrado');
        }

        return fornecedorPJ;
    } catch (error) {
        throw new Error(error);
    }
}

async function updateFornecedorPJ(id_fornecedor, razao_social, nome_fantasia) {
    try {
        await FornecedorPJ.update({
            razao_social,
            nome_fantasia
        }, {
            where: { id_fornecedor }
        })
    } catch (error) {
        throw new Error(error);
    }
}

async function checkIfCNPJExists(cnpj) {
    const fornecedor = await FornecedorPJ.findOne({
        where: { cnpj }
    });
    return fornecedor !== null;
}


module.exports = {
    createFornecedorPJ,
    getFornecedorPJById,
    getAllFornecedorPJ,
    updateFornecedorPJ,
    checkIfCNPJExists,
}