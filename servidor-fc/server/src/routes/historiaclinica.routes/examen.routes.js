const express = require('express');
const router = express.Router();
const examenController = require('../../controllers/historiaclinica.controllers/examen.controller');

router
    .get('/', examenController.get)
    .get('/:id', examenController.getById)
    .get('/historia/:idHistoria', examenController.getByHistoria)
    .get('/last/:idHistoria', examenController.findLastExamenByHistoriaId)
    .post('/', examenController.fileUpload, examenController.create)
    .put('/:id', examenController.fileUpload, examenController.update)
    .put('/estado/:id', examenController.fileUpload, examenController.changeStatus)
    .delete('/:id', examenController._delete);

module.exports = router;