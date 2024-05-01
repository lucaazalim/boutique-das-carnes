const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/mariadb.service');

const ClientePJ = sequelize.define('cliente_pj', {
  id_cliente: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'cliente',
      key: 'id'
    }
  },
  cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true
  },
  razao_social: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nome_fantasia: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = ClientePJ;