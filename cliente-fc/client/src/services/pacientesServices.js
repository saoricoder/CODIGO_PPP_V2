import axios from 'axios';

import {API_URL} from './apiConfig';

// Get all pacientes
export const getPacientes = async () => {
    try {
        const response = await axios.get(`${API_URL}/paciente`);
        return response.data;
    } catch (error) {
        console.error('Error getting pacientes:', error);
        throw error;
    }
};

// Get a single paciente
export const getPaciente = async (pacienteId) => {
    try {
        const response = await axios.get(`${API_URL}/paciente/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting paciente:', error);
        throw error;
    }
};

// Create a new paciente
export const createPaciente = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/paciente`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating paciente:', error);
      throw error;
    }
  };

// Update an existing paciente
export const updatePaciente = async (pacienteId, pacienteData) => {
    try {
        const response = await axios.put(`${API_URL}/paciente/${pacienteId}`, pacienteData);
        return response.data;
    } catch (error) {
        console.error('Error updating paciente:', error);
        throw error;
    }
};

// Delete a paciente
export const deletePaciente = async (pacienteId) => {
    try {
        const response = await axios.delete(`${API_URL}/paciente/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting paciente:', error);
        throw error;
    }
};

export const deleteLogicalPaciente = async(pacienteId) => {
    try {
        const response = await axios.put(`${API_URL}/paciente/estado/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error changing state paciente:', error);
        throw error;
    }

}