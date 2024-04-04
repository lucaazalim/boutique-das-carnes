const path = require('path');
const fs = require('fs');

const {
    createDocumento,
    getDocumentoById,
    updateDocumentoById,
    deleteDocumentoById
} = require('../../models/documentos/documento.model');

const UPLOADS_PATH = 'uploads/';
const FILE_NAME_PREFIX = 'documento-';

async function httpPostDocumento(req, res) {

    if (!req.file) {
        return res.status(400).json({ error: 'Não há arquivo anexado à requisição.' });
    }

    if (!req.body.numero_referencia || !req.body.descricao) {
        return res.status(400).json({ error: 'Número de referência e descrição são obrigatórios.' });
    }

    try {

        const documento = await createDocumento(
            req.body.numero_referencia,
            req.body.descricao
        );

        // Renomeia o arquivo para usar o id do documento

        const extension = path.extname(req.file.originalname);
        const finalName = `${FILE_NAME_PREFIX}${documento.id}${extension}`;
        const finalPath = path.join(UPLOADS_PATH, finalName);

        fs.renameSync(req.file.path, finalPath);

        const updatedDocumento = await updateDocumentoById(documento.id, undefined, undefined, finalName);

        return res.status(201).json(updatedDocumento);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

async function httpGetDocumentoById(req, res) {

    const id = req.params.id;

    try {

        const documento = await getDocumentoById(id);

        if (documento === null) {
            return res.status(404).json({ error: 'Documento não encontrado' });
        }

        return res.status(200).json(documento);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

async function httpPutDocumentoById(req, res) {

    const id = req.params.id;
    const { numero_referencia, descricao } = req.body;

    try {

        const documento = await updateDocumentoById(id, numero_referencia, descricao, undefined);

        if (documento === null) {
            return res.status(404).json({ error: 'Documento não encontrado' });
        }

        return res.status(200).json(documento);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

async function httpDeleteDocumentoById(req, res) {

    const id = req.params.id;

    try {

        const documento = await getDocumentoById(id);

        if (!documento) {
            return res.status(404).json({ error: 'Documento não encontrado' });
        }

        if (documento.nome_arquivo) {
            const filePath = path.join(UPLOADS_PATH, documento.nome_arquivo);
            fs.unlinkSync(filePath);
        }

        await deleteDocumentoById(id);

        return res.status(204).end();

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

module.exports = {
    UPLOADS_PATH,
    httpPostDocumento,
    httpGetDocumentoById,
    httpPutDocumentoById,
    httpDeleteDocumentoById
}