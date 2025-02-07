const express = require('express');
const router = express.Router();
const terapiasController = require('../../controllers/historiaclinica.controllers/terapias.controller');

router
    .get('/', terapiasController.get)
    .get('/:id', terapiasController.getById)
    .post('/', terapiasController.fileUpload, terapiasController.create)
    .put('/:id', terapiasController.fileUpload, terapiasController.update)
    .delete('/:id', terapiasController._delete)
    .get('/paciente/:id', terapiasController.getByPaciente)
    .get('/last/:id_historia', terapiasController.getUltimaTerapia);

module.exports = router;