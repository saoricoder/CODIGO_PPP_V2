import axios from "axios";
import { API_URL } from "./apiConfig";

const formatEcuadorDateTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

const formatEcuadorTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

export const createAuditoria = async (data = {}) => {
  try {
    const currentDate = new Date();
    const formattedData = {
      ...data,
      fecha: formatEcuadorDateTime(currentDate),
      hora_ingreso: data.hora_ingreso || formatEcuadorTime(currentDate),
      hora_salida: data.hora_salida || formatEcuadorTime(currentDate)
    };

    console.log("Data being sent to auditoria:", formattedData);
    const response = await axios.post(`${API_URL}/auditoria`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error creating auditoria:", error.response?.data || error.message);
    throw error;
  }
};

export const generateAuditData = (userId, modulo, operacion, detalle, hora_salida = null) => {
  const validOperations = [
    "CREAR", "EDITAR", "ELIMINAR", "CONSULTAR", "UPDATE", "Update",
    "Crear", "Editar", "Eliminar", "Consultar", "Desactivar",
    "DESCARGAR", "Cerrar Sesión", "Iniciar Sesión",
    "Cambiar Contraseña", "Eliminar Cuenta", "ACTIVAR",
    "DESACTIVAR", "Buscar"
  ];

  if (!validOperations.includes(operacion)) {
    console.warn(`Operación no válida: ${operacion}. Usando 'CONSULTAR' por defecto.`);
    operacion = "CONSULTAR";
  }

  return {
    id_usuario: userId,
    modulo,
    operacion,
    detalle,
    hora_salida
  };
};

export const getAuditorias = async (filters = {}) => {
  try {
    let url = `${API_URL}/auditoria`;
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams(filters);
      url += `?${params.toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting auditorias:", error);
    throw error;
  }
};

export const getAuditoria = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/auditoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting auditoria:", error);
    throw error;
  }
};

export const updateAuditoria = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/auditoria/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating auditoria:", error);
    throw error;
  }
};

export const deleteAuditoria = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auditoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting auditoria:", error);
    throw error;
  }
};

// Función para generar descripciones detalladas basadas en las tablas
export const generateDetailedDescription = (operation, tableName, data) => {
  const tableDescriptions = {
    atencion_medica: "Atención Médica",
    auditoria: "Registro de Auditoría",
    enfermedades: "Registro de Enfermedades",
    especialidad: "Especialidad Médica",
    examen: "Examen Médico",
    historia: "Historia Clínica",
    paciente: "Información del Paciente",
    personalsalud: "Personal de Salud",
    signos_vitales: "Signos Vitales",
    terapias: "Terapias",
    tipo_especialidad: "Tipo de Especialidad",
    tipo_terapia: "Tipo de Terapia",
    usuario: "Usuario del Sistema"
  };

  const description = `${operation} en módulo ${tableDescriptions[tableName] || tableName}`;
  if (data) {
    return `${description}. Detalles: ${JSON.stringify(data)}`;
  }
  return description;
};

export const generateSqlQueries = (data) => {
  if (!data?.tabla) {
    console.error('Error: Invalid data or missing table name');
    return null;
  }

  const schema = data.schema ? `${data.schema}.` : '';
  const tableName = `${schema}${data.tabla}`;
  
  const fields = Object.entries(data)
    .filter(([key]) => !['tabla', 'id', 'schema'].includes(key));
  
  const nombres = fields.map(([key]) => key).join(', ');
  const valores = fields.map(([_, value]) => `'${value}'`).join(', ');
  const setClause = fields.map(([key, value]) => `${key}='${value}'`).join(', ');
  const whereClause = data.id ? `id=${data.id}` : '';

  return {
    insert: `INSERT INTO ${tableName} (${nombres}) VALUES (${valores});`,
    select: `SELECT ${nombres} FROM ${tableName}`,
    update: `UPDATE ${tableName} SET ${setClause}${whereClause ? ` WHERE ${whereClause}` : ''};`,
    delete: whereClause ? `DELETE FROM ${tableName} WHERE ${whereClause};` : '',
    selectById: whereClause ? `SELECT ${nombres} FROM ${tableName} WHERE ${whereClause};` : '',
    search: `SELECT * FROM ${tableName} WHERE ${setClause};`
  };
};

export const detalle_data = generateSqlQueries;
