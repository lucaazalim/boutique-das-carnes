const { 
    getByIdUsuario, 
    createUsuario,
    updateUsuario 
} = require("../../models/usuario/usuario.model");

async function httpGetByIdUsuario(req, res) {
    const { id } = req.params;
    
    try {

        const usuario = await getByIdUsuario(id);

        if (usuario === null) {
            res.status(404).json({ erro: 'Usuario não encontrado' })
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }

}

async function httpPostUsuario(req, res) {
    const { usuario, nome, email, cargo, senha } = req.body;

    if (!usuario || !nome || !email || !cargo || !senha) {
        res.status(400).json({ erro: 'Campos: usuario, nome, email, cargo, senha são obrigatórios' });
    }

    try {
        const data = await createUsuario(usuario, nome, email, cargo, senha);

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

}

async function httpPutUsuario(req, res) {
    const { id } = req.params;
    const usuario = req.body;

    try {

        const data = await getByIdUsuario(id);

        if (data === null) {
            res.status(400).json({ erro: 'Usuario não encontrado' })
        }

        const updatedUsuario = await updateUsuario(usuario, id);

        res.status(200).json(updatedUsuario);

    } catch (error) {
        
    }
}

module.exports = {
    httpGetByIdUsuario,
    httpPostUsuario,
    httpPutUsuario
}