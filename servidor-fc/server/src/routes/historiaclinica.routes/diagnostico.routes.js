const express = require('express');
const router = express.Router();
const diagnosticoController = require('../../controllers/historiaclinica.controllers/diagnostico.controller');

router
  .get('/', diagnosticoController.get)
  .get('/:id_enfermedad/:id_aps', diagnosticoController.getById)
  .post('/', diagnosticoController.create)
  .put('/:id_enfermedad/:id_aps', diagnosticoController.update)
  .delete('/:id_enfermedad/:id_aps', diagnosticoController._delete)
  .get('/enfermedades/aps/:id_aps', diagnosticoController.getByIDAps)
  

module.exports = router;
