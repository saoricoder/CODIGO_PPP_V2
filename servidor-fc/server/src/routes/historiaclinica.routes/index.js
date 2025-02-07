const express = require("express");

const enfermedadesRouter = require("./enfermedades.routes");
const examenRouter = require("./examen.routes");
const especialidadRouter = require("./especialidad.routes");
const tipo_especialidadRouter = require("./tipo_especialidad.routes");
const apsRouter = require("./atencion.routes");
const personalsaludRouter = require("./personalsalud.routes");
const historiaRouter = require("./historia.routes");
const pacienteRouter = require("./paciente.routes");
const signosvitalesRouter = require("./signosvitales.routes");
const terapiasRouter = require("./terapias.routes");
const tipo_terapiaRouter = require("./tipo_terapia.routes");
const cie11Router = require("./cie11.routes");
const usuarioRouter = require("./usuario.routes");
const auditoriaRouter = require("./auditoria.routes");

/**
 * @swagger
 * tags:
 *   - name: Enfermedades
 *     description: Operaciones relacionadas con enfermedades
 *   - name: Exámenes
 *     description: Operaciones relacionadas con exámenes médicos
 *   - name: Especialidades
 *     description: Operaciones relacionadas con especialidades médicas
 *   - name: Atención
 *     description: Operaciones relacionadas con la atención al paciente
 *   - name: Personal de Salud
 *     description: Operaciones relacionadas con el personal de salud
 *   - name: Historia Clínica
 *     description: Operaciones relacionadas con historias clínicas
 *   - name: Pacientes
 *     description: Operaciones relacionadas con pacientes
 *   - name: Signos Vitales
 *     description: Operaciones relacionadas con signos vitales
 *   - name: Terapias
 *     description: Operaciones relacionadas con terapias
 *   - name: CIE-11
 *     description: Operaciones relacionadas con la Clasificación Internacional de Enfermedades (CIE-11)
 *   - name: Usuarios
 *     description: Operaciones relacionadas con usuarios del sistema
 */

function setupHistoriaClinicaRoutes(router) {
  router.use("./auditorias",auditoriaRouter);
  /**
   * @swagger
   * /api/fcc/enfermedades:
   *   get:
   *     summary: Obtiene lista de enfermedades
   *     tags: [Enfermedades]
   *     responses:
   *       200:
   *         description: Lista de enfermedades
   */
  router.use("/enfermedades", enfermedadesRouter);

  /**
   * @swagger
   * /api/fcc/examen:
   *   get:
   *     summary: Obtiene lista de exámenes
   *     tags: [Exámenes]
   *     responses:
   *       200:
   *         description: Lista de exámenes
   */
  router.use("/examen", examenRouter);

  /**
   * @swagger
   * /api/fcc/especialidad:
   *   get:
   *     summary: Obtiene lista de especialidades
   *     tags: [Especialidades]
   *     responses:
   *       200:
   *         description: Lista de especialidades
   */
  router.use("/especialidad", especialidadRouter);

  /**
   * @swagger
   * /api/fcc/tipo_especialidad:
   *   get:
   *     summary: Obtiene lista de tipos de especialidades
   *     tags: [Especialidades]
   *     responses:
   *       200:
   *         description: Lista de tipos de especialidades
   */
  router.use("/tipo_especialidad", tipo_especialidadRouter);

  /**
   * @swagger
   * /api/fcc/atencion:
   *   get:
   *     summary: Obtiene información de atención
   *     tags: [Atención]
   *     responses:
   *       200:
   *         description: Información de atención
   */
  router.use("/atencion", apsRouter);

  /**
   * @swagger
   * /api/fcc/auditoria:
   *  get:
   *    summary: Obtiene informacion de audioria
   *    tags: [Auditoria]
   *    responses:
   *      200:
   *        description: Informacion de auditoria
   */
  router.use("/auditoria", auditoriaRouter);

  /**
   * @swagger
   * /api/fcc/personalsalud:
   *   get:
   *     summary: Obtiene lista de personal de salud
   *     tags: [Personal de Salud]
   *     responses:
   *       200:
   *         description: Lista de personal de salud
   */
  router.use("/personalsalud", personalsaludRouter);

  /**
   * @swagger
   * /api/fcc/historia:
   *   get:
   *     summary: Obtiene historias clínicas
   *     tags: [Historia Clínica]
   *     responses:
   *       200:
   *         description: Historias clínicas
   */
  router.use("/historia", historiaRouter);

  /**
   * @swagger
   * /api/fcc/paciente:
   *   get:
   *     summary: Obtiene información de pacientes
   *     tags: [Pacientes]
   *     responses:
   *       200:
   *         description: Información de pacientes
   */
  router.use("/paciente", pacienteRouter);

  /**
   * @swagger
   * /api/fcc/signos_vitales:
   *   get:
   *     summary: Obtiene información de signos vitales
   *     tags: [Signos Vitales]
   *     responses:
   *       200:
   *         description: Información de signos vitales
   */
  router.use("/signos_vitales", signosvitalesRouter);

  /**
   * @swagger
   * /api/fcc/terapias:
   *   get:
   *     summary: Obtiene información de terapias
   *     tags: [Terapias]
   *     responses:
   *       200:
   *         description: Información de terapias
   */
  router.use("/terapias", terapiasRouter);

  /**
   * @swagger
   * /api/fcc/tipo_terapia:
   *   get:
   *     summary: Obtiene tipos de terapias
   *     tags: [Terapias]
   *     responses:
   *       200:
   *         description: Tipos de terapias
   */
  router.use("/tipo_terapia", tipo_terapiaRouter);

  /**
   * @swagger
   * /api/fcc/cie11:
   *   get:
   *     summary: Obtiene información de CIE-11
   *     tags: [CIE-11]
   *     responses:
   *       200:
   *         description: Información de CIE-11
   */
  router.use("/cie11", cie11Router);

  /**
   * @swagger
   * /api/fcc/users:
   *   get:
   *     summary: Obtiene información de usuarios
   *     tags: [Usuarios]
   *     responses:
   *       200:
   *         description: Información de usuarios
   */
  router.use("/users", usuarioRouter);
}

module.exports = setupHistoriaClinicaRoutes;
