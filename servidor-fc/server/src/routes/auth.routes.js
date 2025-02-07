const express = require('express'); 
const router = express.Router();
const { validateAndReturnUserData } = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones de autenticación y autorización
 */

/**
 * @swagger
 * /api/fcc/auth:
 *   post:
 *     summary: Autenticar usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de autenticación del usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData:
 *                   type: object
 *                   description: Datos del usuario autenticado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
function setupAuthRoutes(router) {
  router.post('/auth', validateAndReturnUserData);
}

module.exports = setupAuthRoutes;