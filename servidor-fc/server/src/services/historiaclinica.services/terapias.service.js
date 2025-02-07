const { models } = require('../../libs/sequelize');

class TerapiasService  { 
  
    constructor() {}

    async find() {
      const res = await models.Terapias.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.Terapias.findByPk(id);
      return res;
    }
    async findByPaciente(id) {
      const res = await models.Terapias.findAll({
        where: {
          id_historia: id
        }
      });
      return res
    }
    async findUltimaTerapia(id_historia) {
      const res = await models.Terapias.findOne({
        where: {
          id_historia: id_historia
        },
        order: [['fecha_hora', 'DESC']]
      });
      return res;
    }


    async create(data) {
      const res = await models.Terapias.create(data);
      return res;
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
  
  module.exports = TerapiasService;