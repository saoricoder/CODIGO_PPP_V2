const { Model, DataTypes } = require('sequelize');

class Aps extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'atencion_medica',
            modelName: 'Aps',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
    static associate(models) {
        Aps.belongsTo(models.Historia, {
            foreignKey: 'id_historia',
            as: 'historia',
        });
        Aps.belongsTo(models.PersonalSalud, {
            foreignKey: 'id_personalsalud',
            as: 'personalsalud',
        });



    }
}

const ApsSchema = {
    id_aps: {
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
    problema_actual: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_atencion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motivo_consulta: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    revision_actual_sistema: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    examen_fisico: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    plan_tratamiento: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    prescripciones: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    diagnostico: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    

};

module.exports = { Aps, ApsSchema };
