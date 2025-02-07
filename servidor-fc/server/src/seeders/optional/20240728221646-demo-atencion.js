'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'atencion_medica', schema: 'fcc_historiaclinica' }, [
      {
        id_historia: 1,
        id_personalsalud: 1,
        problema_actual: "Dolor de cabeza persistente",
        fecha_atencion: new Date("2024-07-29T10:00:00Z"),
        motivo_consulta: "Cefalea crónica",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-0", organ: "Órganos de los sentidos", cpChecked: true, spChecked: false, description: "Dolor en región temporal"},
          {id: "organ-9", organ: "Nervioso", cpChecked: true, spChecked: false, description: "Sensibilidad a la luz"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-0", region: "Cabeza", cpChecked: true, spChecked: false, description: "Sensibilidad en zona temporal"}
        ]),
        plan_tratamiento: "Realizar exámenes de imagen. Iniciar tratamiento con analgésicos.",
        prescripciones: JSON.stringify([
          {medicamento: "Ibuprofeno", presentacion: "400mg", dosis: "1 tableta cada 8 horas por 5 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Migraña sin aura", tipoEnfermedad: "Presuntivo", codigoEnfermedad: "G43.0"}
        ])
      },
      {
        id_historia: 1,
        id_personalsalud: 2,
        problema_actual: "Dolor abdominal y náuseas",
        fecha_atencion: new Date("2024-08-05T14:30:00Z"),
        motivo_consulta: "Malestar gastrointestinal",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-3", organ: "Digestivo", cpChecked: true, spChecked: false, description: "Dolor en epigastrio, náuseas ocasionales"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-3", region: "Abdomen", cpChecked: true, spChecked: false, description: "Dolor a la palpación en epigastrio"}
        ]),
        plan_tratamiento: "Dieta blanda, evitar irritantes. Control en 1 semana.",
        prescripciones: JSON.stringify([
          {medicamento: "Omeprazol", presentacion: "20mg", dosis: "1 cápsula en ayunas por 14 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Gastritis aguda", tipoEnfermedad: "Definitivo", codigoEnfermedad: "K29.1"}
        ])
      },
      {
        id_historia: 1,
        id_personalsalud: 1,
        problema_actual: "Tos seca y dificultad para respirar",
        fecha_atencion: new Date("2024-08-12T11:15:00Z"),
        motivo_consulta: "Síntomas respiratorios",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-1", organ: "Respiratorio", cpChecked: true, spChecked: false, description: "Tos seca persistente, disnea de esfuerzo"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-2", region: "Tórax", cpChecked: true, spChecked: false, description: "Disminución del murmullo vesicular en bases"}
        ]),
        plan_tratamiento: "Realizar radiografía de tórax. Iniciar tratamiento broncodilatador.",
        prescripciones: JSON.stringify([
          {medicamento: "Salbutamol", presentacion: "Inhalador 100mcg", dosis: "2 inhalaciones cada 6 horas por 7 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Bronquitis aguda", tipoEnfermedad: "Presuntivo", codigoEnfermedad: "J20"}
        ])
      },
      {
        id_historia: 1,
        id_personalsalud: 3,
        problema_actual: "Dolor e inflamación en rodilla derecha",
        fecha_atencion: new Date("2024-08-20T16:45:00Z"),
        motivo_consulta: "Dolor articular",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-6", organ: "Músculo Esquelético", cpChecked: true, spChecked: false, description: "Dolor e inflamación en rodilla derecha, limitación de movimiento"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-5", region: "Extremidades", cpChecked: true, spChecked: false, description: "Edema y dolor a la palpación en rodilla derecha"}
        ]),
        plan_tratamiento: "Reposo relativo, aplicar frío local. Fisioterapia.",
        prescripciones: JSON.stringify([
          {medicamento: "Naproxeno", presentacion: "500mg", dosis: "1 tableta cada 12 horas por 7 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Osteoartritis de rodilla", tipoEnfermedad: "Definitivo", codigoEnfermedad: "M17"}
        ])
      },
      {
        id_historia: 2,
        id_personalsalud: 2,
        problema_actual: "Fatiga y pérdida de peso",
        fecha_atencion: new Date("2024-07-30T09:00:00Z"),
        motivo_consulta: "Cansancio generalizado",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-7", organ: "Endocrino", cpChecked: true, spChecked: false, description: "Fatiga, pérdida de peso involuntaria"},
          {id: "organ-2", organ: "Cardio Vascular", cpChecked: true, spChecked: false, description: "Palpitaciones ocasionales"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-1", region: "Cuello", cpChecked: true, spChecked: false, description: "Aumento de volumen en región tiroidea"}
        ]),
        plan_tratamiento: "Solicitar perfil tiroideo completo. Control en 2 semanas con resultados.",
        prescripciones: JSON.stringify([]),
        diagnostico: JSON.stringify([
          {enfermedad: "Hipertiroidismo", tipoEnfermedad: "Presuntivo", codigoEnfermedad: "E05"}
        ])
      },
      {
        id_historia: 2,
        id_personalsalud: 1,
        problema_actual: "Dolor lumbar irradiado a pierna izquierda",
        fecha_atencion: new Date("2024-08-07T13:30:00Z"),
        motivo_consulta: "Lumbago",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-6", organ: "Músculo Esquelético", cpChecked: true, spChecked: false, description: "Dolor lumbar con irradiación a miembro inferior izquierdo"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-5", region: "Extremidades", cpChecked: true, spChecked: false, description: "Lasègue positivo en pierna izquierda"}
        ]),
        plan_tratamiento: "Reposo relativo. Solicitar resonancia magnética de columna lumbar.",
        prescripciones: JSON.stringify([
          {medicamento: "Pregabalina", presentacion: "75mg", dosis: "1 cápsula cada 12 horas por 14 días"},
          {medicamento: "Diclofenaco", presentacion: "75mg", dosis: "1 ampolla intramuscular cada 12 horas por 2 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Hernia de disco lumbar", tipoEnfermedad: "Presuntivo", codigoEnfermedad: "M51.2"}
        ])
      },
      {
        id_historia: 2,
        id_personalsalud: 3,
        problema_actual: "Lesiones cutáneas pruriginosas",
        fecha_atencion: new Date("2024-08-15T10:45:00Z"),
        motivo_consulta: "Erupción cutánea",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-0", organ: "Órganos de los sentidos", cpChecked: true, spChecked: false, description: "Lesiones eritematosas y pruriginosas en tronco y extremidades"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-2", region: "Tórax", cpChecked: true, spChecked: false, description: "Placas eritematosas con descamación"},
          {id: "region-5", region: "Extremidades", cpChecked: true, spChecked: false, description: "Lesiones similares en brazos y piernas"}
        ]),
        plan_tratamiento: "Evitar irritantes. Aplicar crema hidratante. Control en 2 semanas.",
        prescripciones: JSON.stringify([
          {medicamento: "Betametasona", presentacion: "Crema 0.05%", dosis: "Aplicar en lesiones 2 veces al día por 7 días"},
          {medicamento: "Loratadina", presentacion: "10mg", dosis: "1 tableta cada 24 horas por 14 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Dermatitis atópica", tipoEnfermedad: "Definitivo", codigoEnfermedad: "L20"}
        ])
      },
      {
        id_historia: 2,
        id_personalsalud: 2,
        problema_actual: "Dificultad para conciliar el sueño",
        fecha_atencion: new Date("2024-08-22T15:00:00Z"),
        motivo_consulta: "Insomnio",
        revision_actual_sistema: JSON.stringify([
          {id: "organ-9", organ: "Nervioso", cpChecked: true, spChecked: false, description: "Dificultad para conciliar el sueño, irritabilidad diurna"}
        ]),
        examen_fisico: JSON.stringify([
          {id: "region-0", region: "Cabeza", cpChecked: false, spChecked: true, description: ""}
        ]),
        plan_tratamiento: "Medidas de higiene del sueño. Evaluación por psicología.",
        prescripciones: JSON.stringify([
          {medicamento: "Melatonina", presentacion: "3mg", dosis: "1 tableta 30 minutos antes de acostarse por 30 días"}
        ]),
        diagnostico: JSON.stringify([
          {enfermedad: "Insomnio primario", tipoEnfermedad: "Definitivo", codigoEnfermedad: "F51.0"}
        ])
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'atencion_medica', schema: 'fcc_historiaclinica' }, null, {});
  }
};