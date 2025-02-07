'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({tableName: 'tipo_especialidad', schema: 'fcc_historiaclinica'}, [
      { descripcion_tipo_especialidad: 'Medicina Interna' },
      { descripcion_tipo_especialidad: 'Cirugía' },
      { descripcion_tipo_especialidad: 'Pediatría' },
      { descripcion_tipo_especialidad: 'Ginecología y Obstetricia' },
      { descripcion_tipo_especialidad: 'Psiquiatría' },
      { descripcion_tipo_especialidad: 'Medicina Familiar y Comunitaria' },
      { descripcion_tipo_especialidad: 'Medicina de Emergencia' },
      { descripcion_tipo_especialidad: 'Anestesiología' },
      { descripcion_tipo_especialidad: 'Radiología' },
      {  descripcion_tipo_especialidad: 'Patología' },
      {  descripcion_tipo_especialidad: 'Medicina Preventiva y Salud Pública' },
      {  descripcion_tipo_especialidad: 'Medicina Física y Rehabilitación' },
      {  descripcion_tipo_especialidad: 'Medicina Intensiva' },
      {  descripcion_tipo_especialidad: 'Medicina del Trabajo' },
      {  descripcion_tipo_especialidad: 'Medicina Legal y Forense' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipo_especialidad', null, {});
  }
};
