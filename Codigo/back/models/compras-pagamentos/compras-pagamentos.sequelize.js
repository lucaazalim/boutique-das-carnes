const {sequelize} = require('../../services/mariadb');
const { DataTypes } = require('sequelize');

const ComprasPagamentos = sequelize.define('compra_pagamento', {
    id_compra: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    meio_pagamento: {
      type: DataTypes.ENUM('PIX'),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    id_documento_comprovante: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'DocumentoComprovante',
        key: 'id',
      },
    },
},
{
    timestamps: false, 
});

module.exports = ComprasPagamentos;