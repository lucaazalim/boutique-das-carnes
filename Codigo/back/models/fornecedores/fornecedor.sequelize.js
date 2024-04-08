const { DataTypes } = require('sequelize');
const { sequelize } = require('../../services/mariadb.service');

const FornecedorContato = require('./contatos/fornecedor-contato.sequelize');
const FornecedorPF = require('./pf/fornecedor-pf.sequelize');
const FornecedorPJ = require('./pj/fornecedor-pj.sequelize');

const Fornecedor = sequelize.define('fornecedor',
    {
        tipo: {
            type: DataTypes.ENUM,
            values: ['PJ', 'PF'],
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING(10)
        },
        celular: {
            type: DataTypes.STRING(11)
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
            type: DataTypes.STRING(50)
        },
        numero: {
            type: DataTypes.STRING(5)
        },
        complemento: {
            type: DataTypes.STRING(10)
        },
        estado: {
            type: DataTypes.ENUM,
            values: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        notas: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false,
        defaultScope: {
            include: [
                { model: FornecedorPF, as: 'pf' },
                { model: FornecedorPJ, as: 'pj' },
                { model: FornecedorContato, as: 'contatos' }
            ]
        }
    }
);

Fornecedor.hasOne(FornecedorPF, { foreignKey: 'id_fornecedor', as: 'pf' });
Fornecedor.hasOne(FornecedorPJ, { foreignKey: 'id_fornecedor', as: 'pj' });
Fornecedor.hasMany(FornecedorContato, { foreignKey: 'id_fornecedor', as: 'contatos' });

module.exports = Fornecedor;