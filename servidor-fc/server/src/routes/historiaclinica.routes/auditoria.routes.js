const express = require("express");
const router = express.Router();
const auditoriaController = require("../../controllers/historiaclinica.controllers/auditoria.controller");
const multer = require("multer");
const upload = multer();

router
  .get("/", auditoriaController.get)
  .get("/:id", auditoriaController.getById)
  .post("/", auditoriaController.create)
  .put("/:id", upload.none(), auditoriaController.update)
  .delete("/:id", auditoriaController._delete);

module.exports = router;
