const { verifySenha } = require('../../models/usuarios/usuario.model');
const jwt = require('jsonwebtoken');

async function httpLogin(req, res) {
    const { usuario, senha } = req.body;

    let userLogin;

    try {
        userLogin = await verifySenha(usuario, senha); 
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }

    const token = jwt.sign({
        data: userLogin.id
    }, process.env.SECRET_KEY_JWT, { expiresIn: 24 * 60 * 60 });

    res.status(200).json({ 
        message: 'Login efetuado com sucesso',
        token: token
    });

}

module.exports = {
    httpLogin
};