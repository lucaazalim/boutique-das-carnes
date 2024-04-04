const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const documentosRouter = express.Router();

const {
    UPLOADS_PATH,
    httpPostDocumento,
    httpGetDocumentoById,
    httpPutDocumentoById,
    httpDeleteDocumentoById
} = require('./documentos.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_PATH);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        // Define um nome temporário que será alterado quando o documento for salvo
        const tempName = `temp-${uuid()}${extension}`;
        cb(null, tempName);
    },
});

const upload = multer({ storage });

documentosRouter.post('/', upload.single('file'), httpPostDocumento);
documentosRouter.get('/:id', httpGetDocumentoById);
documentosRouter.put('/:id', httpPutDocumentoById);
documentosRouter.delete('/:id', httpDeleteDocumentoById);
documentosRouter.use('/uploads', express.static('uploads'));

module.exports = documentosRouter;