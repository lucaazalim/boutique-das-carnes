const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb');

const Fornecedor = sequelize.define('fornecedor', {
    tipo: {
        type: DataTypes.ENUM,
        values: ['PJ', 'PF'],
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(10)
    },
    celular: {
        type: DataTypes.STRING(11)
    },
    cep: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING(50)
    },
    numero: {
        type: DataTypes.STRING(5)
    },
    complemento: {
        type: DataTypes.STRING(10)
    },
    estado: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    notas: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false
});

module.exports = Fornecedor;