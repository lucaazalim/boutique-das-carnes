const { sequelize } = require('../../services/mariadb.service');
const { DataTypes } = require('sequelize');

const CompraPagamento = require('../compras/compras-pagamentos/compras-pagamentos.sequelize');
const CompraPesagem = require('../compras/compras-pesagens/compras-pesagens.sequelize');

const Compra = sequelize.define('compra',
    {
        id_fornecedor: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDENTE', 'CONCLUIDA', 'CANCELADA'),
            allowNull: false
        },
        unidades_macho: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        unidades_femea: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        preco_arroba: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        desconto: {
            type: DataTypes.DECIMAL(15, 2)
        },
        animais_abatidos: {
            type: DataTypes.SMALLINT.UNSIGNED
        },
        peso_total_abate: {
            type: DataTypes.DECIMAL(7, 2)
        },
        id_documento_romaneio: {
            type: DataTypes.BIGINT
        },
        id_documento_gta: {
            type: DataTypes.BIGINT
        },
        id_documento_nf_compra: {
            type: DataTypes.BIGINT
        },
        id_documento_nf_abate: {
            type: DataTypes.BIGINT
        },
        id_documento_nfs_matadouro: {
            type: DataTypes.BIGINT
        },
        id_documento_nf_retorno: {
            type: DataTypes.BIGINT
        }
    },
    {
        timestamps: false,
        defaultScope: {
            include: [
                { model: CompraPagamento, as: 'pagamentos' },
                { model: CompraPesagem, as: 'pesagens' }
            ]
        }
    }
);

Compra.hasMany(CompraPagamento, { foreignKey: 'id_compra', as: 'pagamentos' });
Compra.hasMany(CompraPesagem, { foreignKey: 'id_compra', as: 'pesagens' });

module.exports = Compra;
