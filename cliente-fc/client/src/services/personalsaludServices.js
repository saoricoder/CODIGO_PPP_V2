import axios from 'axios';
import {API_URL} from './apiConfig';

// Get all pacientes
export const getPersonalSalud = async () => {
    try {
        const response = await axios.get(`${API_URL}/personalsalud`);
        return response.data;
    } catch (error) {
        console.error('Error getting personal:', error);
        throw error;
    }
};

// Get a single paciente
export const getPersonalSaludId = async (personalId) => {
    try {
        const response = await axios.get(`${API_URL}/personalsalud/${personalId}`);
        const personalData = response.data;

        // Obtener los detalles de la especialidad
        const especialidadResponse = await axios.get(`${API_URL}/especialidad/${personalData.id_especialidad}`);
        const especialidadData = especialidadResponse.data;

        // Obtener los detalles del tipo de especialidad
        const tipoEspecialidadResponse = await axios.get(`${API_URL}/tipo_especialidad/${especialidadData.id_tipo_especialidad}`);
        const tipoEspecialidadData = tipoEspecialidadResponse.data;

        // Combinar todos los datos
        return {
            ...personalData,
            nombre_especialidad: especialidadData.nombre_especialidad,
            descripcion_tipo_especialidad: tipoEspecialidadData.descripcion_tipo_especialidad
        };
    } catch (error) {
        console.error('Error getting personal:', error);
        throw error;
    }
};

export const getPersonalSaludSimpleId = async (personalId) => {
    try {
        const response = await axios.get(`${API_URL}/personalsalud/${personalId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting personal:', error);
        throw error;
    }
};

// Create a new paciente
export const createPersonalSalud = async (personalData) => {
    try {
        const response = await axios.post(`${API_URL}/personalsalud`, personalData);
        return response.data;
    } catch (error) {
        console.error('Error creating personal:', error);
        throw error;
    }
};

// Update an existing paciente
export const updatePersonalSalud = async (personalId, personalData) => {
    try {
        const response = await axios.put(`${API_URL}/personalsalud/${personalId}`, personalData);
        return response.data;
    } catch (error) {
        console.error('Error updating personal:', error);
        throw error;
    }
};

// Delete a paciente
export const deletePersonalSalud = async (personalId) => {
    try {
        const response = await axios.delete(`${API_URL}/personalsalud/${personalId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting personal:', error);
        throw error;
    }
};

export const deleteLogicalPersonalSalud = async(personalId) => {
    try {
        const response = await axios.put(`${API_URL}/personalsalud/estado/${personalId}`);
        return response.data;
    } catch (error) {
        console.error('Error changing state personal:', error);
        throw error;
    }
}

export const getEspecialidades = async () => {
    try {
        const response = await axios.get(`${API_URL}/especialidad`);
        return response.data;
    } catch (error) {
        console.error('Error getting especialidades:', error);
        throw error;
    }
};

export const getTipoEspecialidad = async () => {
    try {
        const response = await axios.get(`${API_URL}/tipo_especialidad`);
        return response.data;
    } catch (error) {
        console.error('Error getting tipo especialidades:', error);
        throw error;
    }
}

export const getEstadisticas = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/personalsalud/${id}/estadisticas`);
      return response.data;
    } catch (error) {
      console.error("Error fetching estadisticas:", error);
      throw error;
    }
  };