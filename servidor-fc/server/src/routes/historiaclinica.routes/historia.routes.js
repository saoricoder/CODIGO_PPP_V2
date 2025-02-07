const express = require('express');
const router = express.Router();
const historiaController = require('../../controllers/historiaclinica.controllers/historia.controller');
const multer = require('multer');
const upload = multer();

router
    .get('/', historiaController.get)
    .get('/:id', historiaController.getById)
    .post('/', historiaController.create  )
    .put('/:id', upload.none(), historiaController.update)
    .delete('/:id', historiaController._delete);

module.exports = router;
