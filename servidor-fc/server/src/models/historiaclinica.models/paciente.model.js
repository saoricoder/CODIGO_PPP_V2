const { Model, DataTypes } = require('sequelize');

class Paciente extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'paciente',
            modelName: 'Paciente',
            schema:'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {

        Paciente.hasOne(models.Historia, {
            foreignKey: 'id_paciente',
            as: 'historia',
        });      
    }
}

const PacienteSchema = {
    id_paciente: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    nombre_paciente: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    apellidos_paciente: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    nacionalidad_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    tipo_dni_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    dni_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    direccion_paciente: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    telefono_paciente: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    email_paciente: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    tiposangre_paciente: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    edad_paciente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_paciente: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    genero_paciente: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    familiar_cuidador: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    parentesco_familiar: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    telefono_cuidador: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    foto_paciente: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    estado_paciente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    archivo_documentos_cedulas : {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    archivo_certificado_medico : {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    biografia_paciente: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_registro_paciente: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

module.exports = { Paciente, PacienteSchema };
