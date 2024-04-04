const { sequelize } = require('../../services/mariadb.service');
const { DataTypes } = require('sequelize');

const Documento = sequelize.define('documento',
    {
        numero_referencia: {
            type: DataTypes.STRING(100),
        },
        descricao: {
            type: DataTypes.STRING
        },
        nome_arquivo: {
            type: DataTypes.STRING(100)
        }
    },
    {
        timestamps: false
    }
);

module.exports = Documento;