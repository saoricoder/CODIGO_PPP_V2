const TerapiasService = require('../../services/historiaclinica.services/terapias.service');
const service = new TerapiasService();
const multer = require('multer');
const multerConfigTerapia = require('../../utils/multerConfigTerapia');

const upload = multer(multerConfigTerapia).single('archivo_terapia');

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
        if (req.file) {
            req.body.url_adjunto = `/uploads/terapias/${req.body.id_historia}/${req.file.filename}`;
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

        if (req.file) {
            body.url_adjunto = `/uploads/terapias/${body.id_historia}/${req.file.filename}`;
        }

        const response = await service.update(id, body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getByPaciente = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findByPaciente(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getUltimaTerapia = async (req, res) => {
    try {
        const { id_historia } = req.params;
        const response = await service.findUltimaTerapia(id_historia);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
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
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete, getByPaciente, getUltimaTerapia, fileUpload
};
