const { Model, DataTypes } = require('sequelize');

class Examen extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'examen',
            modelName: 'Examen',
            schema: 'fcc_historiaclinica',
            timestamps: false,

        };
    }
    static associate(models) {
        Examen.belongsTo(models.Historia, {
            foreignKey: 'id_historia',  
            as: 'historia',
        });

    }
}

const ExamenSchema = {
    id_examen: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    },
    id_historia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    fecha_solicitud_examen: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    url_examen: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nombre_examen: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    comentario_examen: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    estado_examen: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    id_aps: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    
};


module.exports = { Examen, ExamenSchema };