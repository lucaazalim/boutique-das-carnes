const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/mariadb.service');

const ClientePF = sequelize.define('cliente_pf', {
  id_cliente: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'cliente',
      key: 'id'
    }
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = ClientePF;
