const jwt = require('jsonwebtoken');

module.exports = function tokenValidated(req, res, next) {

    const { token } = req.headers;

    if(!token) res.status(401).json({ message: 'Acesso Negado. Nenhum token fornecido' })
 
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY_JWT);
        if (payload.exp - payload.iat <= 0) res.statu(401).json({ message: 'Token expirado.' })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token inválido' })
    }

    next();

}
