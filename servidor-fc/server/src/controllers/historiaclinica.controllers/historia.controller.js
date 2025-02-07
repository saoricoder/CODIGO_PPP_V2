const HistoriaService = require('../../services/historiaclinica.services/historia.service');
const service = new HistoriaService();

const create = async (req, res) => {
  try {
    const body = req.body;

    console.log('Initial body:', JSON.stringify(body, null, 2));

    // Handle JSON fields
    ['ant_familiares_materno', 'ant_familiares_paterno', 'otros_antecedentes', 
     'ant_prenatales', 'ant_perinatales', 'ant_postnatales'].forEach(field => {
      console.log(`Processing ${field}:`, JSON.stringify(body[field], null, 2));
      if (body[field]) {
        if (typeof body[field] === 'string') {
          try {
            body[field] = JSON.parse(body[field]);
            console.log(`${field} parsed from string:`, JSON.stringify(body[field], null, 2));
          } catch (error) {
            console.warn(`Failed to parse ${field} as JSON string, attempting to use as is`);
          }
        }
        // Ensure the field is a valid object, if not, set to empty object
        if (typeof body[field] !== 'object' || body[field] === null) {
          console.warn(`Invalid type for ${field}, setting to empty object`);
          body[field] = {};
        }
      } else {
        // If the field is not present in the body, set it to an empty object
        body[field] = {};
      }
      console.log(`Final ${field}:`, JSON.stringify(body[field], null, 2));
    });

    // Handle array fields
    ['alergias', 'medicamentos', 'tratamientos_recibidos'].forEach(field => {
      console.log(`Processing ${field}:`, JSON.stringify(body[field], null, 2));
      if (body[field]) {
        let newItems;
        if (typeof body[field] === 'string') {
          try {
            newItems = JSON.parse(body[field]);
            console.log(`${field} parsed from string:`, JSON.stringify(newItems, null, 2));
          } catch (error) {
            newItems = body[field].split(',').map(item => item.trim());
            console.log(`${field} split from string:`, JSON.stringify(newItems, null, 2));
          }
        } else if (Array.isArray(body[field])) {
          newItems = body[field];
        } else {
          console.warn(`Unexpected type for ${field}: ${typeof body[field]}, setting to empty array`);
          newItems = [];
        }
        body[field] = newItems;
      } else {
        body[field] = [];
      }
      console.log(`Final ${field}:`, JSON.stringify(body[field], null, 2));
    });

    // Convert boolean fields
    if (body.seguro_social !== undefined) {
      body.seguro_social = body.seguro_social === true || body.seguro_social === 'true';
      console.log('seguro_social:', body.seguro_social);
    }

    // Handle date field
    if (body.fecha_historia) {
      body.fecha_historia = new Date(body.fecha_historia);
      console.log('fecha_historia:', body.fecha_historia);
    }

    // Handle text fields
    ['motivo_consulta_historia', 'diagnostico_presuntivo', 'observaciones'].forEach(field => {
      if (body[field] && typeof body[field] !== 'string') {
        body[field] = String(body[field]);
      }
      console.log(`${field}:`, body[field]);
    });

    console.log('Final body before create:', JSON.stringify(body, null, 2));
    const response = await service.create(body);
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error creating record:', error);
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
    
    console.log('id', id);
    console.log('Initial body:', JSON.stringify(body, null, 2));

    const existingRecord = await service.findOne(id);
    if (!existingRecord) {
      return res.status(404).send({ success: false, message: 'Record not found' });
    }

    // Handle JSON fields
    ['ant_familiares_materno', 'ant_familiares_paterno', 'otros_antecedentes', 
     'ant_prenatales', 'ant_perinatales', 'ant_postnatales'].forEach(field => {
      console.log(`Processing ${field}:`, JSON.stringify(body[field], null, 2));
      if (body[field]) {
        if (typeof body[field] === 'string') {
          try {
            body[field] = JSON.parse(body[field]);
            console.log(`${field} parsed from string:`, JSON.stringify(body[field], null, 2));
          } catch (error) {
            console.warn(`Failed to parse ${field} as JSON string, attempting to use as is`);
          }
        }
        // Ensure the field is a valid object, if not, set to null
        if (typeof body[field] !== 'object' || body[field] === null) {
          console.warn(`Invalid type for ${field}, setting to null`);
          body[field] = null;
        }
      }
      console.log(`Final ${field}:`, JSON.stringify(body[field], null, 2));
    });

    // Handle array fields
    ['alergias', 'medicamentos', 'tratamientos_recibidos'].forEach(field => {
      console.log(`Processing ${field}:`, JSON.stringify(body[field], null, 2));
      if (body[field]) {
        let newItems;
        if (typeof body[field] === 'string') {
          try {
            newItems = JSON.parse(body[field]);
            console.log(`${field} parsed from string:`, JSON.stringify(newItems, null, 2));
          } catch (error) {
            newItems = body[field].split(',').map(item => item.trim());
            console.log(`${field} split from string:`, JSON.stringify(newItems, null, 2));
          }
        } else if (Array.isArray(body[field])) {
          newItems = body[field];
        } else {
          console.warn(`Unexpected type for ${field}: ${typeof body[field]}, setting to empty array`);
          newItems = [];
        }
        body[field] = newItems;
      }
      console.log(`Final ${field}:`, JSON.stringify(body[field], null, 2));
    });

    // Convert boolean fields
    if (body.seguro_social !== undefined) {
      body.seguro_social = body.seguro_social === true || body.seguro_social === 'true';
      console.log('seguro_social:', body.seguro_social);
    }

    // Handle date field
    if (body.fecha_historia) {
      body.fecha_historia = new Date(body.fecha_historia);
      console.log('fecha_historia:', body.fecha_historia);
    }

    // Handle text fields
    ['motivo_consulta_historia', 'diagnostico_presuntivo', 'observaciones'].forEach(field => {
      if (body[field] && typeof body[field] !== 'string') {
        body[field] = String(body[field]);
      }
      console.log(`${field}:`, body[field]);
    });

    console.log('Final body before update:', JSON.stringify(body, null, 2));
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    console.error('Error updating record:', error);
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

module.exports = {
  create, get, getById, update, _delete
};