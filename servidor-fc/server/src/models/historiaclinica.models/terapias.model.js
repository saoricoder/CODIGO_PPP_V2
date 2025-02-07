const { Model, DataTypes } = require('sequelize');

class Terapias extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'terapias',
            modelName: 'Terapias',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
    static associate(models) {
        Terapias.belongsTo(models.Historia, {
            foreignKey: 'id_historia',
            as: 'historia_terapia',
        });
        Terapias.belongsTo(models.PersonalSalud, {
            foreignKey: 'id_personalsalud',
            as: 'personalsalud_terapia',
        });
        Terapias.belongsTo(models.TipoTerapia, {
            foreignKey: 'id_tipo_terapia',
            as: 'tipo_terapia',
        });
    }
}

const TerapiasSchema = {
    id_terapia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_historia: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    id_personalsalud: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    id_tipo_terapia: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    notas_evolucion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    farmacoterapia_indicaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url_adjunto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

};

module.exports = { Terapias, TerapiasSchema };
