const express = require('express');
const router = express.Router();
const SignosVitalesController = require('../../controllers/historiaclinica.controllers/signosvitales.controller');


router
    .get('/', SignosVitalesController.get)
    .get('/:id', SignosVitalesController.getById)
    .get('/historia/:idHistoria', SignosVitalesController.getByHistoria)
    .get('/last/:idHistoria', SignosVitalesController.findLastSignosVitalesByHistoriaId)
    .get('/aps/:id', SignosVitalesController.getByIdAps)
    .post('/', SignosVitalesController.create)
    .put('/:id', SignosVitalesController.update)
    .delete('/:id', SignosVitalesController._delete);

module.exports = router;