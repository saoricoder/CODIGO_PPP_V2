const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Directorio base para los archivos de terapias
const baseUploadDir = path.join(__dirname, '../uploads/terapias');

// Función para verificar y crear el directorio si no existe
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Directorio ${dir} no existe. Creando...`);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directorio ${dir} creado.`);
  } else {
    console.log(`Directorio ${dir} ya existe.`);
  }
};

const multerConfigTerapia = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const idHistoria = req.body.id_historia;
      const uploadPath = path.join(baseUploadDir, idHistoria.toString());
      ensureDirExists(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.split('.').pop();
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const baseName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
      const shortName = baseName.slice(0, 30 - extension.length - 1);
      const uniqueFilename = `${currentDate}-${shortName}.${extension}`;
      cb(null, uniqueFilename);
    }
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo inválido. Solo se permiten archivos PDF.'));
    }
  },
};

module.exports = multerConfigTerapia;