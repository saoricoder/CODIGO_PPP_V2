'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({tableName: 'examen', schema: 'fcc_historiaclinica'}, [
      {
        id_historia: 1,
        fecha_solicitud_examen: new Date('2024-03-15'),
        url_examen: 'https://ejemplo.com/examen1.pdf',
        nombre_examen: 'Evaluación Audiológica',
        comentario_examen: 'Paciente con hipoacusia neurosensorial bilateral profunda',
        estado_examen: 'Completado',
        id_aps: 1
      },
      {
        id_historia: 2,
        fecha_solicitud_examen: new Date('2024-03-16'),
        url_examen: 'https://ejemplo.com/examen2.pdf',
        nombre_examen: 'Evaluación Oftalmológica',
        comentario_examen: 'Paciente con ambliopía en ojo derecho',
        estado_examen: 'Pendiente',
        id_aps: 2
      },
      {
        id_historia: 3,
        fecha_solicitud_examen: new Date('2024-03-17'),
        url_examen: 'https://ejemplo.com/examen3.pdf',
        nombre_examen: 'Evaluación Neurológica',
        comentario_examen: 'Paciente con parálisis cerebral espástica',
        estado_examen: 'En proceso',
        id_aps: 3
      },
      {
        id_historia: 4,
        fecha_solicitud_examen: new Date('2024-03-18'),
        url_examen: 'https://ejemplo.com/examen4.pdf',
        nombre_examen: 'Examen de Sangre',
        comentario_examen: 'Control rutinario',
        estado_examen: 'Completado',
        id_aps: 4
      },
      {
        id_historia: 5,
        fecha_solicitud_examen: new Date('2024-03-19'),
        url_examen: 'https://ejemplo.com/examen5.pdf',
        nombre_examen: 'Radiografía de Tórax',
        comentario_examen: 'Seguimiento de infección respiratoria',
        estado_examen: 'Pendiente',
        id_aps: 5
      },
      {
        id_historia: 6,
        fecha_solicitud_examen: new Date('2024-03-20'),
        url_examen: 'https://ejemplo.com/examen6.pdf',
        nombre_examen: 'Electroencefalograma',
        comentario_examen: 'Evaluación de actividad cerebral',
        estado_examen: 'Programado',
        id_aps: 6
      },
      {
        id_historia: 7,
        fecha_solicitud_examen: new Date('2024-03-21'),
        url_examen: 'https://ejemplo.com/examen7.pdf',
        nombre_examen: 'Prueba de Alergias',
        comentario_examen: 'Sospecha de alergias alimentarias',
        estado_examen: 'En proceso',
        id_aps: 7
      },
      {
        id_historia: 8,
        fecha_solicitud_examen: new Date('2024-03-22'),
        url_examen: 'https://ejemplo.com/examen8.pdf',
        nombre_examen: 'Ecografía Abdominal',
        comentario_examen: 'Control de órganos internos',
        estado_examen: 'Completado',
        id_aps: 8
      },
      {
        id_historia: 9,
        fecha_solicitud_examen: new Date('2024-03-23'),
        url_examen: 'https://ejemplo.com/examen9.pdf',
        nombre_examen: 'Análisis de Orina',
        comentario_examen: 'Sospecha de infección urinaria',
        estado_examen: 'Pendiente',
        id_aps: 9
      },
      {
        id_historia: 10,
        fecha_solicitud_examen: new Date('2024-03-24'),
        url_examen: 'https://ejemplo.com/examen10.pdf',
        nombre_examen: 'Evaluación Psicológica',
        comentario_examen: 'Evaluación de desarrollo cognitivo',
        estado_examen: 'Programado',
        id_aps: 10
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({tableName: 'examen', schema: 'fcc_historiaclinica'}, null, {});
  }
};