const Usuario = require('./usuario.sequelize');

async function getByIdUsuario(id) {
    return await Usuario.findByPk(id);
}

async function createUsuario(usuario, nome, email, cargo, senha) {
    return await Usuario.create({
        usuario, nome, email, cargo, senha
    });
}

async function updateUsuario(usuario, id) {
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