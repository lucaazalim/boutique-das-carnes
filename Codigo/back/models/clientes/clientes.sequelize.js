const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');

const ClientePF = require('./pf/cliente-pf.sequelize');
const ClientePJ = require('./pj/cliente-pj.sequelize');

const Cliente = sequelize.define('cliente', {
    tipo: {
      type: DataTypes.ENUM('PJ', 'PF'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(10),
      allowNull: true  
    },  
    celular: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM(
        'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
        'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
      ),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    defaultScope: {
      include: [
          { model: ClientePF, as: 'pf' },
          { model: ClientePJ, as: 'pj' },
      ]
    }
});

Cliente.hasOne(ClientePF, { foreignKey: 'id_cliente', as: 'pf' });
Cliente.hasOne(ClientePJ, { foreignKey: 'id_cliente', as: 'pj' });

module.exports = Cliente;