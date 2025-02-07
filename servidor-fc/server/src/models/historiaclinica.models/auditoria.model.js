const { Model, DataTypes } = require("sequelize");

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

  static associate(models) {
    Auditoria.belongsTo(models.Usuario, {
      foreignKey: "id_usuario",
      as: "usuario",
    });
  }
}

const AuditoriaSchema = {
  id_auditoria: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.BIGINT,
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
          "Crear",
          "Editar",
          "Eliminar",
          "Consultar",
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
    defaultValue: DataTypes.NOW, // Registrar la fecha automáticamente
  },
};

module.exports = { Auditoria, AuditoriaSchema };
