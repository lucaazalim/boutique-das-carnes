const { Op } = require('sequelize');
const FornecedorPF = require('./fornecedor-pf.sequelize');

async function createFornecedorPF(id_fornecedor, cpf, nome) {
    try {
        await FornecedorPF.create({
            id_fornecedor,
            cpf,
            nome
        })
    } catch (error) {

    }
}

async function updateFornecedorPF(id_fornecedor, nome) {
    try {
        await FornecedorPF.update({
            nome
        }, {
            where: { id_fornecedor }
        })
    } catch (error) {
        throw new Error(error);
    }
}

async function getFornecedorPFById(id_fornecedor) {
    return await FornecedorPF.findByPk(id_fornecedor);
}

async function getAllFornecedorPF(idFornecedorFirst, idFornecedorLast) {
    return await FornecedorPF.findAll({
        where: {
            id_fornecedor: {
                [Op.between]: [idFornecedorFirst, idFornecedorLast]
            }
        }
    });
}

async function checkIfCPFExists(cpf) {
    const fornecedor = await FornecedorPF.findOne({
        where: { cpf }
    });
    return fornecedor !== null;
}

module.exports = {
    createFornecedorPF,
    updateFornecedorPF,
    getFornecedorPFById,
    getAllFornecedorPF,
    checkIfCPFExists
}