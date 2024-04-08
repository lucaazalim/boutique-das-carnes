const { sequelize } = require('../../../services/mariadb.service');
const { DataTypes } = require('sequelize');
const Fornecedor = require('../fornecedor.sequelize');

const FornecedorContato = sequelize.define('fornecedor_contato',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_fornecedor: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: 'fornecedor',
                key: 'id'
            }
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        celular: {
            type: DataTypes.STRING(11)
        },
        cargo: {
            type: DataTypes.STRING(100)
        }
    },
    {
        timestamps: false
    }
);

module.exports = FornecedorContato;