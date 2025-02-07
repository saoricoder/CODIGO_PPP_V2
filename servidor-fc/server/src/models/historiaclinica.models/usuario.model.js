const { Model, DataTypes } = require('sequelize');//comilla simple

class Usuario extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "usuario",
      modelName: "Usuario",
      schema: "fcc_historiaclinica",
      timestamps: true,
    };
  }

  static associate(models) {
    Usuario.belongsTo(models.PersonalSalud, {
      foreignKey: "id_personal_salud",
      as: "personalsalud",
    });
/*
    Usuario.hasMany(models.Auditoria, {
      foreignKey: "id_usuario",
      as: "auditorias",
    });*/
  }
}

const UsuarioSchema = {
  id_usuario: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  },
  id_personal_salud: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  apellido_usuario: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  correo_usuario: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  password_usuario: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  rol_usuario: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  estado_usuario: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
};

module.exports = { Usuario, UsuarioSchema };
