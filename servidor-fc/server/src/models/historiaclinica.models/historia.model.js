const { Model, DataTypes } = require('sequelize');

class Historia extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'historia',
            modelName: 'Historia',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        Historia.hasMany(models.Aps, {
            foreignKey: 'id_historia',
            as: 'Aps',
        });
        Historia.hasMany(models.Examen, {
            foreignKey: 'id_historia',
            as: 'examenes',
        });
        Historia.hasMany(models.Enfermedad, {
            foreignKey: 'id_historia',
            as: 'enfermedades',
        });
        Historia.belongsTo(models.Paciente, {
            foreignKey: 'id_paciente',
            as: 'paciente',
        });
        Historia.hasMany(models.SignosVitales, {
            foreignKey: 'id_historia',
            as: 'signos_vitales',
        });
    }
}

const HistoriaSchema = {
    id_historia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_paciente: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    codigo_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    fecha_historia: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motivo_consulta_historia: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ant_familiares_materno: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ant_familiares_paterno: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    otros_antecedentes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ant_prenatales: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ant_perinatales: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ant_postnatales: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    seguro_social: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    alergias: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    medicamentos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    diagnostico_presuntivo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tratamientos_recibidos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
};

module.exports = { Historia, HistoriaSchema };