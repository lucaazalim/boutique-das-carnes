const Documento = require('./documento.sequelize')

async function createDocumento(numero_referencia, descricao) {
    try {
        return Documento.create({
            numero_referencia,
            descricao
        });
    } catch (error) {
        throw new Error(`Erro ao criar documento: ${error.message}`);
    }
}

async function getDocumentoById(id) {
    try {
        return await Documento.findByPk(id) || null;
    } catch (error) {
        throw new Error(`Erro ao obter documento por id: ${error.message}`);
    }
}

async function updateDocumentoById(id, numero_referencia, descricao, nome_arquivo) {
    try {

        await Documento.update({
            numero_referencia,
            descricao,
            nome_arquivo
        }, {
            where: { id }
        });

        return await getDocumentoById(id);

    } catch (error) {
        throw new Error(`Erro ao atualizar documento por id: ${error.message}`);
    }
}

async function deleteDocumentoById(id) {
    try {
        await Documento.destroy({ where: { id } });
    } catch (error) {
        throw new Error(`Erro ao deletar documento por id: ${error.message}`);
    }
}

module.exports = {
    createDocumento,
    getDocumentoById,
    updateDocumentoById,
    deleteDocumentoById
}