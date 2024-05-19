const { sequelize } = require('../../services/mariadb.service');
const { Sequelize, DataTypes } = require('sequelize');

const Despesa = sequelize.define('despesa', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    id_documento_comprovante: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
  }, {
    timestamps: false
  });
  
  module.exports = Despesa;