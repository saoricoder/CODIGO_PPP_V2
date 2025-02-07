const { Model, DataTypes } = require('sequelize');

class TipoTerapia extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_terapia',
            modelName: 'TipoTerapia',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        TipoTerapia.hasMany(models.Terapias, {
            foreignKey: 'id_tipo_terapia',
            as: 'terapias',
        });
    }
}

const TipoTerapiaSchema = {
    id_tipo_terapia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_terapia: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
};

module.exports = { TipoTerapia, TipoTerapiaSchema };
