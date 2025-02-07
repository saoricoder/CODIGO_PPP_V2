const { models } = require('../../libs/sequelize');

class PersonalSaludService  { 
  
    constructor() {}

    async find() {
      const res = await models.PersonalSalud.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.PersonalSalud.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.PersonalSalud.create(data);
      return res;
    }

    async getEstadisticas(idPersonalSalud) {  
      const personalSalud = await models.PersonalSalud.findByPk(idPersonalSalud);
      if (!personalSalud) {
        throw new Error('Personal de salud no encontrado');
      }
  
      const pacientesAtendidos = await  models.Aps.count({
        where: { id_personalsalud: idPersonalSalud },
        distinct: true,
        col: 'id_historia'
      });
  
      const terapiasRealizadas = await models.Terapias.count({
        where: { id_personalsalud: idPersonalSalud }
      });

      const usuario = await models.Usuario.findOne({
        where: { id_personal_salud: idPersonalSalud }
      });

      
      // Calcular años de experiencia (asumiendo que tenemos un campo fecha_ingreso en PersonalSalud)
      const anosExperiencia = usuario.createdAt
        ? Math.floor((new Date() - new Date(usuario.createdAt)) / (365.25 * 24 * 60 * 60 * 1000))
        : 0;
  
      return {
        pacientes_atendidos: pacientesAtendidos,
        terapias_realizadas: terapiasRealizadas,
        anos_experiencia: anosExperiencia
      };
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
  
  module.exports = PersonalSaludService;