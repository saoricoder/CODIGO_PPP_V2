const express = require('express');
const router = express.Router();
const tipo_terapiaController = require('../../controllers/historiaclinica.controllers/tipo_terapia.controller');

router
    .get('/', tipo_terapiaController.get)
    .get('/:id', tipo_terapiaController.getById)
    .post('/', tipo_terapiaController.create)
    .put('/:id', tipo_terapiaController.update)
    .delete('/:id', tipo_terapiaController._delete);

module.exports = router;
