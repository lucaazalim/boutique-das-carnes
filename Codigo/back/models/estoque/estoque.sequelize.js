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
            type: DataTypes.ENUM('FIGADO','DIANTEIRO_SEM_CUPIM','CUPIM','SERROTE_SEM_RABADA','COSTELA','RABADA'),
            allowNull: false
        }
    }, {
        timestamps: false
    }
)

module.exports = Estoque;