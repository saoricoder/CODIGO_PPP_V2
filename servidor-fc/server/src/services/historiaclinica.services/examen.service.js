const { models } = require("../../libs/sequelize");

class ExamenService {
  constructor() {}

  async find() {
    return await models.Examen.findAll();
  }

  async create(data) {
    try {
      const newExamen = await models.Examen.create(data);
      return newExamen;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear examen");
    }
  }

  async findById(id) {
    return await models.Examen.findOne({
      where: { id_examen: id },
    });
  }

  async findByHistoria(id_historia) {
    return await models.Examen.findAll({
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

module.exports = ExamenService;
