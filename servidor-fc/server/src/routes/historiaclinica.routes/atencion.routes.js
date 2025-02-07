const express = require('express');
const router = express.Router();
const apsController = require('../../controllers/historiaclinica.controllers/atencion.controller');

router
    .get('/', apsController.get)
    .get('/:id', apsController.getById)
    .get('/historia/:idHistoria', apsController.getByHistoria)
    .get('/last/:idHistoria', apsController.findLastAtencionByHistoriaId)
    .get('/first/:idHistoria', apsController.findFirstAtencionByHistoriaId)
    .post('/',  apsController.create)
    .put('/:id',  apsController.update)
    .delete('/:id', apsController._delete);

module.exports = router;