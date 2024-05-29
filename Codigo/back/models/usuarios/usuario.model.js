const Usuario = require('./usuario.sequelize');
const bycrypt = require('bcryptjs');

const SALT = bycrypt.genSaltSync(10);

async function getAllUsuario() {
    return await Usuario.findAll();
}

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

async function deleteUsuario(id) {
    await Usuario.destroy({
        where: { id }
    });
}

async function verifySenha(usuario, senha) {

    const data = await Usuario.findOne({ where: { usuario } });

    if (!data) {
        throw new Error('Usuario não encontrado');
    }

    if (await bycrypt.compare(senha, data.senha)) {
        return data;
    } else {
        throw new Error('Senha inválida');
    }

}

module.exports = {
    getAllUsuario,
    getByIdUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    verifySenha,
}