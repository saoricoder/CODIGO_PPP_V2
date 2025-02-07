const DiagnosticoService = require('../../services/historiaclinica.services/diagnostico.service');
const service = new DiagnosticoService();

const create = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const response = await service.find();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  const { id_enfermedad, id_aps } = req.params;
  try {
    const diagnostico = await service.findById(id_enfermedad, id_aps);
    if (!diagnostico) {
      return res.status(404).json({ message: 'Diagnóstico no encontrado' });
    }
    return res.json(diagnostico);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener diagnóstico' });
  }
};

const getByIDAps = async (req, res) => {
    const { id_aps } = req.params;
    try {
        const diagnostico = await service.findByAPS(id_aps);
        if (!diagnostico) {
            return res.status(404).json({ message: 'Diagnóstico no encontrado' });
        }
        return res.json(diagnostico);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener diagnóstico' });
    }
}

const update = async (req, res) => {
  const { id_enfermedad, id_aps } = req.params;
  const body = req.body;
  try {
    const response = await service.update(id_enfermedad, id_aps, body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  const { id_enfermedad, id_aps } = req.params;
  try {
    const response = await service.delete(id_enfermedad, id_aps);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const getEnfermedadesByAPS = async (req, res) => {
    const { id_aps } = req.params;
    try {
      const enfermedades = await service.findEnfermedadesByAPS(id_aps);
      if (!enfermedades || enfermedades.length === 0) {
        return res.status(404).json({ message: 'No se encontraron enfermedades para el APS especificado' });
      }
      return res.json(enfermedades);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener enfermedades', error: error.message });
    }
  };
  

module.exports = {
  create,
  get,
  getById,
  update,
  _delete,
  getEnfermedadesByAPS,
  getByIDAps
};
