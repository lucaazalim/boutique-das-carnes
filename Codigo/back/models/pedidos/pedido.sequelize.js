const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');
const Item = require('./item/item.sequelize');

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
    timestamps: false,
    defaultScope: {
        include: [
            { model: Item, as: 'itens' }
        ]
    }
});

Pedido.hasMany(Item, { foreignKey: 'id_pedido', as: 'itens'});

module.exports = Pedido;