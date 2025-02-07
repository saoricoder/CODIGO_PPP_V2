'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({tableName: 'tipo_terapia', schema: 'fcc_historiaclinica' }, [
      { nombre_terapia: 'Terapia de Lenguaje' },
      { nombre_terapia: 'Terapia Física' },
      { nombre_terapia: 'Terapia Ocupacional' },
    ], { });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipo_terapia', null, {});
  }
};
