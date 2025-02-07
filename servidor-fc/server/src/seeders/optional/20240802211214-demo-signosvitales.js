'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'signos_vitales', schema: 'fcc_historiaclinica' }, [
      {
        id_historia: 1,
        id_aps: 1,
        fecha_medicion: new Date("2024-07-29T10:00:00Z"),
        temperatura: 37.2,
        presion_arterial: "120/80",
        pulso: 78,
        frecuencia_respiratoria: 16,
        peso: 70.5,
        talla: 1.70
      },
      {
        id_historia: 1,
        id_aps: 2,
        fecha_medicion: new Date("2024-08-05T14:30:00Z"),
        temperatura: 37.8,
        presion_arterial: "115/75",
        pulso: 82,
        frecuencia_respiratoria: 18,
        peso: 69.8,
        talla: 1.70
      },
      {
        id_historia: 1,
        id_aps: 3,
        fecha_medicion: new Date("2024-08-12T11:15:00Z"),
        temperatura: 37.5,
        presion_arterial: "118/78",
        pulso: 88,
        frecuencia_respiratoria: 22,
        peso: 70.0,
        talla: 1.70
      },
      {
        id_historia: 1,
        id_aps: 4,
        fecha_medicion: new Date("2024-08-20T16:45:00Z"),
        temperatura: 36.8,
        presion_arterial: "122/82",
        pulso: 76,
        frecuencia_respiratoria: 16,
        peso: 70.2,
        talla: 1.70
      },
      {
        id_historia: 2,
        id_aps: 5,
        fecha_medicion: new Date("2024-07-30T09:00:00Z"),
        temperatura: 37.0,
        presion_arterial: "130/85",
        pulso: 92,
        frecuencia_respiratoria: 18,
        peso: 62.5,
        talla: 1.65
      },
      {
        id_historia: 2,
        id_aps: 6,
        fecha_medicion: new Date("2024-08-07T13:30:00Z"),
        temperatura: 36.9,
        presion_arterial: "125/80",
        pulso: 80,
        frecuencia_respiratoria: 17,
        peso: 62.0,
        talla: 1.65
      },
      {
        id_historia: 2,
        id_aps: 7,
        fecha_medicion: new Date("2024-08-15T10:45:00Z"),
        temperatura: 37.1,
        presion_arterial: "120/78",
        pulso: 78,
        frecuencia_respiratoria: 16,
        peso: 61.8,
        talla: 1.65
      },
      {
        id_historia: 2,
        id_aps: 8,
        fecha_medicion: new Date("2024-08-22T15:00:00Z"),
        temperatura: 36.7,
        presion_arterial: "118/76",
        pulso: 72,
        frecuencia_respiratoria: 15,
        peso: 61.5,
        talla: 1.65
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'signos_vitales', schema: 'fcc_historiaclinica' }, null, {});
  }
};