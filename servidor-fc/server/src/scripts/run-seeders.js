// Assuming your seeder code is in a file named "tipo_enfermedad.seeder.js"

const { Sequelize } = require('sequelize');
const  { config } = require('../config/db');  // Assuming your DB config is here
const setupModels = require('../models/index.models');
const seedTipoEnfermedad = require('../seeders/20240625203217-demo-tipoenfermedad');  // Your seeder file
const seedTipoEspecialidad = require('../seeders/20240625203219-demo-tipoespecialidad');  // Your seeder file
const seedTipoExamen = require('../seeders/20240625203654-demo-tipoexamen');  // Your seeder file
const seedEspecialidad = require('../seeders/20240625204103-demo-especialidad');  // Your seeder file
const seedPaciente = require('../seeders/20240625204110-demo-paciente');  // Your seeder file
const seedPersonalSalud = require('../seeders/20240625204121-demo-personalsalud');  // Your seeder file
const seedHistoria = require('../seeders/20240625204123-demo-historia');  // Your seeder file
const seedEnfermedad = require('../seeders/20240625204201-demo-enfermedad');  // Your seeder file
const seedExamen = require('../seeders/20240625204206-demo-examen');  // Your seeder file
const seedSignosVitales = require('../seeders/20240625204214-demo-signosvitales');  // Your seeder file
const { TipoEnfermedad } = require('../models/historiaclinica.models/tipo_enfermedad.model');


  
const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser, 
    config.dbPassword, 
    {
      host: config.dbHost,
      dialect: 'postgres',
      port: config.dbPort, 
      logging: console.log,
    }
  );

  sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

    console.log('Connection to the database has been established successfully.');
    setupModels(sequelize);
    sequelize.sync().then(() => {
        console.log('Models synchronized successfully');
        seedTipoEnfermedad.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedTipoEspecialidad.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
    
        seedTipoExamen.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedEspecialidad.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedPaciente.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedPersonalSalud.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedHistoria.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedEnfermedad.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedExamen.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
        seedSignosVitales.up(sequelize.getQueryInterface(), Sequelize).then(() => {
            console.log('Seed successfully executed');
        }
        ).catch((error) => {
            console.error('Error executing seed:', error);
        });
    }
    ).catch((error) => {
        console.error('Error synchronizing models:', error);
    });


