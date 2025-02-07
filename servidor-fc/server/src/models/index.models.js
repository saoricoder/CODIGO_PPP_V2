const setupHistoriaClinicaModels = require('./historiaclinica.models');

const setupHooks = require('./hooks');

function setupModels(sequelize) {
  setupHistoriaClinicaModels(sequelize);


  // Configurar hooks después de inicializar los modelos
  setupHooks();
}

module.exports = setupModels;
