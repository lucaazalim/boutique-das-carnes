const { sequelize } = require('../../services/mariadb.service');
const { DataTypes } = require('sequelize');

const DespesaCategorias = sequelize.define('despesa_categoria', 
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        cor: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false
    }
);

module.exports = DespesaCategorias;