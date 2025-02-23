const { Model, DataTypes, Sequelize } = require("sequelize");

class Auditoria extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "auditoria",
      modelName: "Auditoria",
      schema: "fcc_historiaclinica",
      timestamps: false,
    };
  }
/*
  static associate(models) {
    Auditoria.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  }*/
}

const AuditoriaSchema = {
  id_auditoria: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  
  id_usuario: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  modulo: {
    allowNull: true,
    type: DataTypes.STRING(40),
  },
  operacion: {
    allowNull: true,
    type: DataTypes.STRING(40),
    validate: {
      isIn: [
        [
          "CREAR",
          "EDITAR",
          "ELIMINAR",
          "CONSULTAR",
          "UPDATE",
          "Update",
          "Crear",
          "Editar",
          "Eliminar",
          "Consultar",
          "Desactivar",
          "DESCARGAR",
          "Cerrar Sesión",
          "Iniciar Sesión",
          "Cambiar Contraseña",
          "Eliminar Cuenta",
          "ACTIVAR" ,
           "DESACTIVAR",
           "Buscar",
        ],
      ], // Restricción de valores posibles
    },
  },
  detalle: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  fecha: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Guayaquil\''),
    get() {
      const date = this.getDataValue('fecha');
      if (date) {
        return new Date(date).toLocaleString('es-EC', {
          timeZone: 'America/Guayaquil'
        });
      }
      return null;
    }
  },
  hora_ingreso: {
    allowNull: true,
    type: DataTypes.TIME,
    defaultValue: Sequelize.literal('CURRENT_TIME AT TIME ZONE \'America/Guayaquil\''),
    get() {
      const time = this.getDataValue('hora_ingreso');
      if (time) {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('es-EC', {
          timeZone: 'America/Guayaquil',
          hour12: false
        });
      }
      return null;
    }
  },
  hora_salida: {
    allowNull: true,
    type: DataTypes.TIME,
    defaultValue: Sequelize.literal('CURRENT_TIME AT TIME ZONE \'America/Guayaquil\''),
    get() {
      const time = this.getDataValue('hora_salida');
      if (time) {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('es-EC', {
          timeZone: 'America/Guayaquil',
          hour12: false
        });
      }
      return null;
    }
  }
};

module.exports = { Auditoria, AuditoriaSchema };
