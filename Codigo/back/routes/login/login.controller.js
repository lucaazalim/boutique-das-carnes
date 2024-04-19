const { verifySenha } = require('../../models/usuarios/usuario.model');
const jwt = require('jsonwebtoken');

async function httpLogin(req, res) {
    const { usuario, senha } = req.body;

    const userLogin = await verifySenha(usuario, senha); 

    const token = jwt.sign({
        data: userLogin.id
    }, process.env.SECRET_KEY_JWT, { expiresIn: 24 * 60 * 60 });

    if (userLogin) {
        res.status(200).json({ 
            message: 'Login efetuado com sucesso',
            token: token
        });
    } else {
        res.status(401).json({ message: 'Usuario ou senha inválidos' });
    }

}

module.exports = {
    httpLogin
};