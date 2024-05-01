const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/mariadb.service');
const Fornecedor = require('../fornecedor.sequelize');

const FornecedorPJ = sequelize.define('fornecedor_pj', {
    id_fornecedor: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        reference: {
            model: 'fornecedor',
            key: 'id'
        }
    },
    cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false
    },
    razao_social: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nome_fantasia: {
        type: DataTypes.STRING(255)
    }
}, {
    timestamps: false
})

module.exports = FornecedorPJ;