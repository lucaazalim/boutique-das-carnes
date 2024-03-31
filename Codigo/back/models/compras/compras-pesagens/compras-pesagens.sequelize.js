const { sequelize } = require('../../../services/mariadb.service');
const { DataTypes } = require('sequelize');

const CompraPesagens = sequelize.define('compra_pesagem', {
    id_compra: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'compra',
            key: 'id',
        },
    },
    unidades: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    peso: {
        type: DataTypes.DECIMAL(7, 2),
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
});

module.exports = CompraPesagens;
