const express = require('express');
const router = express.Router();
const personalsaludController = require('../../controllers/historiaclinica.controllers/personalsalud.controller');

router
    .get('/', personalsaludController.get)
    .get('/:id', personalsaludController.getById)
    .post('/', personalsaludController.fileUpload, personalsaludController.create)
    .put('/:id', personalsaludController.fileUpload, personalsaludController.update)
    .delete('/:id', personalsaludController._delete)
    .put('/estado/:id', personalsaludController.logicalDelete)
    .get('/:id/estadisticas', personalsaludController.getEstadisticas);

module.exports = router;