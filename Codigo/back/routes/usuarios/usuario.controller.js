const {
    getAllUsuario,
    getByIdUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require("../../models/usuarios/usuario.model");

async function httpGetAllUsuario(req, res) {
    try {
        const usuarios = (await getAllUsuario()).map(usuario => {
            delete usuario.dataValues.senha;
            return usuario;
        })
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}

async function httpGetByIdUsuario(req, res) {
    const { id } = req.params;

    try {

        const usuario = await getByIdUsuario(id);

        if (!usuario) {
            res.status(404).json({ erro: 'Usuario não encontrado' });
        }

        delete usuario.dataValues.senha;
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ erro: error.message })
    }

}

async function httpPostUsuario(req, res) {
    const { usuario, nome, email, cargo, senha } = req.body;

    if (!usuario || !nome || !email || !cargo || !senha) {
        res.status(400).json({ erro: 'Campos: usuario, nome, email, cargo, senha são obrigatórios' });
        return;
    }

    try {
        const data = await createUsuario(usuario, nome, email, cargo, senha);

        res.status(201).json(data);
    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ erro: 'Usuario ou email já existe' });
            return;
        }

        res.status(500).json({ erro: error.message });

    }

}

async function httpPutUsuario(req, res) {
    const { id } = req.params;
    const usuario = req.body;

    try {

        const data = await getByIdUsuario(id);

        if (!data) {
            res.status(400).json({ erro: 'Usuario não encontrado' })
        }

        const updatedUsuario = await updateUsuario(usuario, id);

        res.status(200).json(updatedUsuario);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function httpDeleteUsuario(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await deleteUsuario(id);
        if (deletedRows > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ erro: 'Usuario não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }

}

module.exports = {
    httpGetAllUsuario,
    httpGetByIdUsuario,
    httpPostUsuario,
    httpPutUsuario,
    httpDeleteUsuario
}