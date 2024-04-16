const Usuario = require('./usuario.sequelize');
const bycrypt = require('bcryptjs');

const SALT = bycrypt.genSaltSync(10);

async function getByIdUsuario(id) {
    return await Usuario.findByPk(id);
}

async function createUsuario(usuario, nome, email, cargo, senha) {

    const senhaHash = bycrypt.hashSync(senha, SALT);

    return await Usuario.create({
        usuario, nome, email, cargo, senha: senhaHash
    });
}

async function updateUsuario(usuario, id) {

    if (usuario.senha) {
        usuario.senha = bycrypt.hashSync(usuario.senha, SALT);
    }

    await Usuario.update(usuario, {
        where: { id }
    });
    return await Usuario.findByPk(id);
}

module.exports = {
    getByIdUsuario,
    createUsuario,
    updateUsuario
}