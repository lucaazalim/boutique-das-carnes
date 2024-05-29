const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');

const Pedido = sequelize.define('pedido', {

}, {
    timestamps: false,
    defaultScope: {
        include: [
            { model: Item, as: 'itens' }
        ]
    }
});

module.exports = Pedido;