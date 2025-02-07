const { models } = require("../../libs/sequelize");

class EnfermedadesService {
  constructor() {}

  async find() {
    return await models.Enfermedad.findAll();
  }

  async create(data) {
    try {
      const newEnfermedad = await models.Enfermedad.create(data);
      return newEnfermedad;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear enfermedad");
    }
  }

  async findById(id) {
    return await models.Enfermedad.findOne({
      where: { id_enfermedad: id },
    });
  }

  async findByHistoria(id_historia) {
    return await models.Enfermedad.findAll({
      where: { id_historia },
    });
  }

  async update(id, data) {
    const model = await this.findById(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findById(id);
    await model.destroy();
    return { deleted: true };
  }
}

module.exports = EnfermedadesService;
