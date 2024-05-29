const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/mariadb.service');

const Item = sequelize.define('pedido_item', {
    id_pedido: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'pedido',
            key: 'id'
        }
    },
    conjunto: {
        type: DataTypes.ENUM('FIGADO','FATO','DIANTEIRO_SEM_COSTELA','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','CUPIM','CARCACA','BANDA_CARREGADA','BANDA_DESCARREGADA','DIANTEIRO_COM_COSTELA'),
        allowNull: false
    },
    letra: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(7,2),
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Item;