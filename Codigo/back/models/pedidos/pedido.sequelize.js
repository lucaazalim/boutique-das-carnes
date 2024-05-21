const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');

const Pedido = sequelize.define('pedido', {
    id_cliente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        reference: {
            model: 'cliente',
            key: 'id'
        }
    },
    id_compra: {
        type: DataTypes.BIGINT,
        allowNull: false,
        reference: {
            model: 'compra',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = Pedido;