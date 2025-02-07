const { Model, DataTypes } = require('sequelize');

class SignosVitales extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'signos_vitales',
            modelName: 'SignosVitales',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        SignosVitales.belongsTo(models.Historia, {
            foreignKey: 'id_historia',
            as: 'historia',
        });
    }
}

const SignosVitalesSchema = {
    id_signos_vitales: {
        allowNull: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_historia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_aps: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    fecha_medicion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    temperatura: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    presion_arterial: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    pulso: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    frecuencia_respiratoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    talla: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
};

module.exports = { SignosVitales, SignosVitalesSchema };
