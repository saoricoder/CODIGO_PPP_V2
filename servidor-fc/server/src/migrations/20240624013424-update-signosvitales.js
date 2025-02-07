'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Renombrar la tabla original
    await queryInterface.renameTable('signos_vitales', 'signos_vitales_old');
    
    // 2. Crear la nueva tabla con las columnas actualizadas
    await queryInterface.createTable('signos_vitales', {
      id_signos_vitales: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      id_paciente: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      id_aps: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      fecha_medicion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      temperatura: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      presion_arterial: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      pulso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      frecuencia_respiratoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      talla: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });

    // 3. Migrar datos de la tabla antigua a la nueva

    // 4. Eliminar la tabla antigua
    await queryInterface.dropTable('signos_vitales_old');
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios realizados en la migración "up"
    await queryInterface.renameTable('signos_vitales', 'signos_vitales_new');
    await queryInterface.createTable('signos_vitales', {
      id_signos_vitales: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      id_paciente: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      id_aps: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      fecha_medicion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      temperatura: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      presion_arterial: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      pulso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      frecuencia_respiratoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      talla: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });

    await queryInterface.sequelize.query(`
      INSERT INTO signos_vitales (id_signos_vitales, id_paciente, id_aps, fecha_medicion, temperatura, presion_arterial, pulso, frecuencia_respiratoria, peso, talla)
      SELECT id_signos_vitales, id_paciente, id_aps, fecha_medicion, temperatura, presion_arterial, pulso, frecuencia_respiratoria, peso, talla
      FROM signos_vitales_new;
    `);

    await queryInterface.dropTable('signos_vitales_new');
  }
};
