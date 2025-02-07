const PersonalSaludService = require('../../services/historiaclinica.services/personalsalud.service');
const service = new PersonalSaludService();
const multer = require('multer');
const multerConfig = require('../../utils/multerConfigPersonal');

const upload = multer(multerConfig).fields([
    { name: 'hdv_personal', maxCount: 1 },
    { name: 'foto_personal', maxCount: 1 },
]);

const fileUpload = async (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.status(400).json({ success: false, message: error.message });
        } else {
            return next();
        }
    });
};

const create = async (req, res) => {
    try {
        if (req.files) {
            if (req.files['foto_personal']) {
                req.body.foto_personal = `/uploads/personal/perfil/archivo/${req.files['foto_personal'][0].filename}`;
            }
            if (req.files['hdv_personal']) {
                req.body.hdv_personal = `/uploads/personal/hdv/archivo/${req.files['hdv_personal'][0].filename}`;
            }
        }

        const response = await service.create(req.body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        if (req.files) {
            if (req.files['foto_personal']) {
                body.foto_personal = `/uploads/personal/perfil/archivo/${req.files['foto_personal'][0].filename}`;
            } else if (body.foto_personal === 'null') {
                body.foto_personal = null;
            }
            if (req.files['hdv_personal']) {
                body.hdv_personal = `/uploads/personal/hdv/archivo/${req.files['hdv_personal'][0].filename}`;
            } else if (body.hdv_personal === 'null') {
                body.hdv_personal = null;
            }
        }

        const response = await service.update(id, body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};



const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const logicalDelete = async (req, res) => {
    try {
      const { id } = req.params;
      var personal = await service.findOne(id);
      const actualizarPersonal = [];
      actualizarPersonal.estado_personal = !personal.estado_personal;            
      const response = await service.update(id, actualizarPersonal);
      res.json(response); 
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}
const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getEstadisticas = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await service.getEstadisticas(id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

module.exports = {
    fileUpload, create, get, getById, update, _delete, logicalDelete,getEstadisticas
};
