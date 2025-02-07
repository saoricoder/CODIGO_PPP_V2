const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Directorio base para los archivos del personal
const baseUploadDir = path.join(__dirname, '../uploads/personal');

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

// Asegurarse de que los directorios existan al inicio
ensureDirExists(path.join(baseUploadDir, 'perfil'));
ensureDirExists(path.join(baseUploadDir, 'hdv'));

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath;
      if (file.fieldname === 'foto_personal') {
        uploadPath = path.join(baseUploadDir, 'perfil');
      } else if (file.fieldname === 'hdv_personal') {
        uploadPath = path.join(baseUploadDir, 'hdv');
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.split('.').pop();
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const baseName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
      const shortName = baseName.slice(0, 30 - extension.length - 1); // Ajusta el nombre base
      const uniqueFilename = `${currentDate}-${shortName}.${extension}`; // Incluye la extensión
      cb(null, uniqueFilename);
    }
  }),
  fileFilter(req, file, cb) {
    if (file.fieldname === 'foto_personal') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Formato de imagen inválido para foto de perfil. Solo se permiten JPEG y PNG.'));
      }
    } else if (file.fieldname === 'hdv_personal') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Formato inválido para hoja de vida. Solo se permite PDF.'));
      }
    } else {
      cb(new Error('Campo de archivo no reconocido.'));
    }
  },
};

module.exports = multerConfig;
