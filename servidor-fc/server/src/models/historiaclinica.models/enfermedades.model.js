const { Model, DataTypes } = require('sequelize');

class Enfermedad extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'enfermedades',
            modelName: 'Enfermedad',
            schema:'fcc_historiaclinica',
            timestamps: false, 
            
        };
    }
    static associate(models) {
        Enfermedad.belongsTo(models.Historia, {
            foreignKey: 'id_historia',
            as: 'historia',
        });
        

    }
}

const EnfermedadSchema = {
    id_enfermedad: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_historia: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    codigo_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field:'codigo_enfermedad'
    },
    tipo_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field:'tipo_enfermedad'
    },
    nombre_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field:'nombre_enfermedad'
    },
    descripcion_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field: 'descripcion_enfermedad'
    }
};

module.exports = { Enfermedad, EnfermedadSchema };
