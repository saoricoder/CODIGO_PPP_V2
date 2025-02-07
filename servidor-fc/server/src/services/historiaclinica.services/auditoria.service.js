const { models } = require("../../libs/sequelize");

class AuditoriaService {
  constructor() {}

  async find() {
    const res = await models.Auditoria.findAll();
    return res;
  }

  async findOne(id) {
    const res = await models.Auditoria.findByPk(id);
    return res;
  }

  async create(data) {
    console.log(data);
    try {
      const res = await models.Auditoria.create(data);
      return res;
    } catch (error) {
      console.error("Error al crear auditoría:", error);
      throw error; // O manejar el error de alguna otra forma
    }
  }

  async update(id, data) {
    const model = await this.findOne(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }
}

module.exports = AuditoriaService;
