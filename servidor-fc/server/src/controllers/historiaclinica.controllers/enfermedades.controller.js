const EnfermedadesService = require('../../services/historiaclinica.services/enfermedades.service');
const service = new EnfermedadesService();

const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const enfermedad = await service.findById(id);
        if (!enfermedad) {
            return res.status(404).json({ message: 'Enfermedad no encontrada' });
        }
        return res.json(enfermedad);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener enfermedad' });
    }
}

const getByHistoria = async (req, res) => {
    const { idHistoria } = req.params;
    try {
        const enfermedades = await service.findByHistoria(idHistoria);
        if (!enfermedades) {
            return res.status(404).json({ message: 'Enfermedades no encontradas' });
        }
        return res.json(enfermedades);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener enfermedades' });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
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

const findLastEnfermedadByHistoriaId = async (req, res) => {
    const { idHistoria } = req.params;
    try {
        const enfermedadesPaciente = await service.findByHistoria(idHistoria);
        const lastEnfermedad = enfermedadesPaciente[enfermedadesPaciente.length - 1];

        if (lastEnfermedad) {
            return res.json(lastEnfermedad);
        } else {
            return null; // Puedes manejar el caso en que no haya registros
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener enfermedad' });
    }
}


module.exports = {
    get,
    getById,
    getByHistoria,
    create,
    update,
    _delete,
    findLastEnfermedadByHistoriaId
};
