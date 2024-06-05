const { sequelize } = require('../../../services/mariadb.service');
const { DataTypes } = require('sequelize');

const CompraCarcacas = sequelize.define('compra_carcaca',
    {
        id_compra: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'compra',
                key: 'id',
            },
        },
        sequencial: {
            type: DataTypes.TINYINT(2),
            allowNull: false,
        },
        peso_total: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        criado_em: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        timestamps: false,
    }
);

module.exports = CompraCarcacas;
