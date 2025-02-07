const { Model, DataTypes } = require('sequelize');

class PersonalSalud extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'personalsalud',
            modelName: 'PersonalSalud',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
    static associate(models) {
        PersonalSalud.belongsTo(models.Especialidad, {
            foreignKey: 'id_especialidad',
            as: 'especialidad',
        });
        PersonalSalud.hasOne(models.Usuario, {
            foreignKey: 'id_personal_salud',
            as: 'usuario',
        });
    }

    
}

const PersonalSaludSchema = {
    id_personalsalud: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_especialidad: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombres_personal: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    apellidos_personal: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    nacionalidad_personal: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    tipo_dni_personal: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    dni_personal: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    titulos_personal: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    telefono_personal: {
        type: DataTypes.STRING(160),
        allowNull: true,
    },
    direccion_personal: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    email_personal: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    hdv_personal: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    foto_personal: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    estado_personal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    fecha_nacimiento_personal: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_registro_personal: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    licencia_personal: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { PersonalSalud, PersonalSaludSchema };
