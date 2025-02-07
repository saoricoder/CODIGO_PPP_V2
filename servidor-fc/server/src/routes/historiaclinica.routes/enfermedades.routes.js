const express = require('express');
const router = express.Router();
const enfermedadesController = require('../../controllers/historiaclinica.controllers/enfermedades.controller');

router
    .get('/', enfermedadesController.get)
    .get('/:id', enfermedadesController.getById)
    .get('/historia/:idHistoria', enfermedadesController.getByHistoria)
    .get('/last/:idHistoria', enfermedadesController.findLastEnfermedadByHistoriaId)
    .post('/',  enfermedadesController.create)
    .put('/:id', enfermedadesController.update)
    .delete('/:id', enfermedadesController._delete);

module.exports = router;
