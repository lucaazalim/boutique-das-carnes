const { DataTypes } = require('sequelize')
const { sequelize } = require('../../services/mariadb.service');

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true    
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    cargo: {
        type: DataTypes.ENUM('ADMINISTRADOR','GERENTE'),
        allowNull: false
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Usuario;