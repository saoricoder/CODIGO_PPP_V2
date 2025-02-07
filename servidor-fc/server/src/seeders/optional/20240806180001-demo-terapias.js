'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'terapias', schema: 'fcc_historiaclinica' }, [
      {
        id_historia: 1,
        id_personalsalud: 1,
        id_tipo_terapia: 1,
        fecha_hora: new Date('2024-08-06T10:00:00Z'),
        notas_evolucion: 'El paciente muestra mejora en la articulación de palabras complejas.',
        farmacoterapia_indicaciones: 'Continuar con ejercicios de pronunciación 3 veces al día.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia1_paciente1.pdf'
      },
      {
        id_historia: 1,
        id_personalsalud: 2,
        id_tipo_terapia: 2,
        fecha_hora: new Date('2024-08-07T14:30:00Z'),
        notas_evolucion: 'Se observa una mejora en la movilidad del hombro derecho.',
        farmacoterapia_indicaciones: 'Aplicar compresas calientes antes de los ejercicios.',
        url_adjunto: null
      },
      {
        id_historia: 2,
        id_personalsalud: 3,
        id_tipo_terapia: 3,
        fecha_hora: new Date('2024-08-08T11:15:00Z'),
        notas_evolucion: 'El paciente ha mejorado en actividades de motricidad fina.',
        farmacoterapia_indicaciones: 'Practicar ejercicios de enhebrado diariamente.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia1_paciente2.mp4'
      },
      {
        id_historia: 2,
        id_personalsalud: 1,
        id_tipo_terapia: 1,
        fecha_hora: new Date('2024-08-09T09:45:00Z'),
        notas_evolucion: 'Se nota una mejora en la fluidez del habla.',
        farmacoterapia_indicaciones: 'Continuar con ejercicios de respiración y vocalización.',
        url_adjunto: null
      },
      {
        id_historia: 3,
        id_personalsalud: 2,
        id_tipo_terapia: 2,
        fecha_hora: new Date('2024-08-10T16:00:00Z'),
        notas_evolucion: 'El paciente muestra mayor estabilidad al caminar.',
        farmacoterapia_indicaciones: 'Incrementar la duración de los ejercicios de equilibrio.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia1_paciente3.jpg'
      },
      {
        id_historia: 3,
        id_personalsalud: 3,
        id_tipo_terapia: 3,
        fecha_hora: new Date('2024-08-11T13:30:00Z'),
        notas_evolucion: 'Se observa mejora en la realización de actividades cotidianas.',
        farmacoterapia_indicaciones: 'Practicar actividades de vestirse y desvestirse.',
        url_adjunto: null
      },
      {
        id_historia: 1,
        id_personalsalud: 1,
        id_tipo_terapia: 1,
        fecha_hora: new Date('2024-08-12T10:30:00Z'),
        notas_evolucion: 'El paciente muestra avances en la comprensión de frases complejas.',
        farmacoterapia_indicaciones: 'Incorporar lectura en voz alta a la rutina diaria.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia2_paciente1.pdf'
      },
      {
        id_historia: 4,
        id_personalsalud: 2,
        id_tipo_terapia: 2,
        fecha_hora: new Date('2024-08-13T11:00:00Z'),
        notas_evolucion: 'Se nota una mejora en la fuerza muscular de las piernas.',
        farmacoterapia_indicaciones: 'Aumentar gradualmente la resistencia en ejercicios de piernas.',
        url_adjunto: null
      },
      {
        id_historia: 4,
        id_personalsalud: 3,
        id_tipo_terapia: 3,
        fecha_hora: new Date('2024-08-14T15:45:00Z'),
        notas_evolucion: 'El paciente ha mejorado en la coordinación ojo-mano.',
        farmacoterapia_indicaciones: 'Continuar con ejercicios de precisión utilizando objetos pequeños.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia1_paciente4.mp4'
      },
      {
        id_historia: 5,
        id_personalsalud: 1,
        id_tipo_terapia: 1,
        fecha_hora: new Date('2024-08-15T09:30:00Z'),
        notas_evolucion: 'Se observa una mejora en la producción de sonidos específicos.',
        farmacoterapia_indicaciones: 'Practicar ejercicios de articulación frente al espejo.',
        url_adjunto: null
      },
      {
        id_historia: 5,
        id_personalsalud: 2,
        id_tipo_terapia: 2,
        fecha_hora: new Date('2024-08-16T14:00:00Z'),
        notas_evolucion: 'El paciente muestra mayor rango de movimiento en el cuello.',
        farmacoterapia_indicaciones: 'Realizar ejercicios de estiramiento suave del cuello 3 veces al día.',
        url_adjunto: 'https://ejemplo.com/adjuntos/terapia1_paciente5.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'terapias', schema: 'fcc_historiaclinica' }, null, {});
  }
};