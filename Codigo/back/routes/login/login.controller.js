const { verifySenha } = require('../../models/usuarios/usuario.model');

async function httpLogin(req, res) {
    const { usuario, senha } = req.body;

    if (await verifySenha(usuario, senha)) {
        res.status(200).json({ message: 'Login efetuado com sucesso' });
    } else {
        res.status(401).json({ message: 'Usuario ou senha inválidos' });
    }

}

module.exports = {
    httpLogin
};