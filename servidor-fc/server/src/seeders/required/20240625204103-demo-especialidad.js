'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({tableName: 'especialidad', schema: 'fcc_historiaclinica'}, [
      { id_tipo_especialidad: 1, nombre_especialidad: 'Cardiología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Neumología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Gastroenterología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Neurología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Endocrinología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Nefrología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Hematología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Oncología Médica' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Reumatología' },
      { id_tipo_especialidad: 1, nombre_especialidad: 'Geriatría' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía General' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Cardíaca' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Neurocirugía' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Ortopédica y Traumatología' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Plástica' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Urología' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Torácica' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Vascular' },
      { id_tipo_especialidad: 2, nombre_especialidad: 'Cirugía Pediátrica' },
      { id_tipo_especialidad: 3, nombre_especialidad: 'Pediatría General' },
      { id_tipo_especialidad: 3, nombre_especialidad: 'Neonatología' },
      { id_tipo_especialidad: 3, nombre_especialidad: 'Cardiología Pediátrica' },
      { id_tipo_especialidad: 3, nombre_especialidad: 'Neurología Pediátrica' },
      { id_tipo_especialidad: 3, nombre_especialidad: 'Oncología Pediátrica' },
      { id_tipo_especialidad: 4, nombre_especialidad: 'Ginecología' },
      { id_tipo_especialidad: 4, nombre_especialidad: 'Obstetricia' },
      { id_tipo_especialidad: 4, nombre_especialidad: 'Medicina Materno-Fetal' },
      { id_tipo_especialidad: 5, nombre_especialidad: 'Psiquiatría General' },
      { id_tipo_especialidad: 5, nombre_especialidad: 'Psiquiatría Infantil y Adolescente' },
      { id_tipo_especialidad: 5, nombre_especialidad: 'Psicogeriatría' },
      { id_tipo_especialidad: 6, nombre_especialidad: 'Medicina Familiar' },
      { id_tipo_especialidad: 7, nombre_especialidad: 'Medicina de Urgencias' },
      { id_tipo_especialidad: 8, nombre_especialidad: 'Anestesiología y Reanimación' },
      { id_tipo_especialidad: 9, nombre_especialidad: 'Radiodiagnóstico' },
      { id_tipo_especialidad: 9, nombre_especialidad: 'Medicina Nuclear' },
      { id_tipo_especialidad: 9, nombre_especialidad: 'Radioterapia Oncológica' },
      { id_tipo_especialidad: 10, nombre_especialidad: 'Anatomía Patológica' },
      { id_tipo_especialidad: 11, nombre_especialidad: 'Epidemiología' },
      { id_tipo_especialidad: 12, nombre_especialidad: 'Fisiatría' },
      { id_tipo_especialidad: 13, nombre_especialidad: 'Medicina Intensiva' },
      { id_tipo_especialidad: 14, nombre_especialidad: 'Salud Laboral' },
      { id_tipo_especialidad: 15, nombre_especialidad: 'Medicina Forense' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('especialidad', null, {});
  }
};
