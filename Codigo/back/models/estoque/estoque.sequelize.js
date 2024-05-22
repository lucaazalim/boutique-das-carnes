const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');

const Estoque = sequelize.define('estoque', 
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        id_compra_carcaca: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'compra_carcaca',
                key: 'id'
            }
        },
        tipo: {
            type: DataTypes.ENUM('FIGADO','DIANTEIRO_SEM_COSTELA','CUPIM','SERROTE_SEM_RABADA','SERROTE_COM_RABADA','COSTELA','FATO'),
            allowNull: false
        },
        id_pedido_item: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'pedido_item',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    }
)

module.exports = Estoque;