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
    try {
      // Asegurarse de que las fechas estén en el formato correcto
      const currentDate = new Date();
      const formattedData = {
        ...data,
        fecha: currentDate.toISOString().split('T')[0],
        hora_ingreso: currentDate.toTimeString().split(' ')[0],
        hora_salida: currentDate.toTimeString().split(' ')[0]
      };
      const res = await models.Auditoria.create(formattedData);
      return res;
    } catch (error) {
      console.error("Error al crear auditoría:", error);
      throw error;
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
