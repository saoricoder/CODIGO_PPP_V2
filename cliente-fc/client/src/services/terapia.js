import axios from 'axios';
import {API_URL} from './apiConfig';

export const getTerapias = async (pacienteId) => {
    try {
        const response = await axios.get(`${API_URL}/terapias/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting terapias:', error);
        throw error;
    }
}

export const createTerapia = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/terapias`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating terapia:', error);
      throw error;
    }
  };

  export const updateTerapia = async (terapiaId, terapiaData) => {
    try {
      const response = await axios.put(`${API_URL}/terapias/${terapiaId}`, terapiaData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
      return response.data;
    } catch (error) {
      console.error('Error updating terapia:', error);
      throw error;
    }
  };

export const getTerapiaByPaciente = async (pacienteId) => {
    try {
        const response = await axios.get(`${API_URL}/terapias/paciente/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting terapia:', error);
        throw error;
    }
}

export const getTerapia = async (terapiaId) => {
    try {
        const response = await axios.get(`${API_URL}/terapias/${terapiaId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting terapia:', error);
        throw error;
    }
}

export const getLastTerapia = async (pacienteId) => {
    try {
        const response = await axios.get(`${API_URL}/terapias/last/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting last terapia:', error);
        throw error;
    }
}

export const deleteTerapia = async (terapiaId) => {
    try {
        const response = await axios.delete(`${API_URL}/terapias/${terapiaId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting terapia:', error);
        throw error;
    }
}

