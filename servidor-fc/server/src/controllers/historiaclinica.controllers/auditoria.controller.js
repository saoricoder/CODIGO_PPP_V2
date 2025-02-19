const AuditoriaService = require("../../services/historiaclinica.services/auditoria.service");
const service = new AuditoriaService();

const create = async (req, res) => {
  try {
    console.log("Received audit data:", req.body);
    const data = req.body;

    // Enhanced validation
    if (!data.id_usuario || !data.modulo || !data.operacion || !data.detalle) {
      console.error("Missing required fields:", {
        id_usuario: !!data.id_usuario,
        modulo: !!data.modulo,
        operacion: !!data.operacion,
        detalle: !!data.detalle
      });
      return res.status(400).json({
        success: false,
        message: "Faltan campos requeridos",
        missingFields: {
          id_usuario: !data.id_usuario,
          modulo: !data.modulo,
          operacion: !data.operacion,
          detalle: !data.detalle
        }
      });
    }

    // Add current timestamp if not provided
    const currentDate = new Date();
    const auditData = {
      ...data,
      fecha: data.fecha || currentDate.toISOString().split('T')[0],
      hora_ingreso: data.hora_ingreso || currentDate.toTimeString().split(' ')[0],
      hora_salida: data.hora_salida || currentDate.toTimeString().split(' ')[0]
    };

    console.log("Processed audit data:", auditData);
    const response = await service.create(auditData);
    
    console.log("Audit created successfully:", response);
    res.json({ 
      success: true, 
      data: response,
      message: "Auditoría creada exitosamente"
    });

  } catch (error) {
    console.error("Detailed error in audit creation:", {
      message: error.message,
      stack: error.stack,
      details: error.details || 'No additional details'
    });

    res.status(500).json({
      success: false,
      message: "Error al crear la auditoría",
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    console.log("auditoria actualizada con exito");
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { create, get, getById, update, _delete };
