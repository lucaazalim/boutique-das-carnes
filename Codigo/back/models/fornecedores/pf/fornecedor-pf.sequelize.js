const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/mariadb.service');
const Fornecedor = require('../fornecedor.sequelize');

const FornecedorPF = sequelize.define('fornecedor_pf', {
    id_fornecedor: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        reference: {
            model: 'fornecedor',
            key: 'id'
        }
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = FornecedorPF;