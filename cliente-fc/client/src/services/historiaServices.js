import axios from 'axios';
import { API_URL } from './apiConfig'; // Remove BASE_API_URL since it's not used

export const getHistoria = async (historiaId) => {
  try {
    const response = await axios.get(`${API_URL}/historia/${historiaId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting historia:', error);
    throw error;
  }
};

export const getHistorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/historia`);
    return response.data;
  } catch (error) {
    console.error('Error getting historias:', error);
    throw error;
  }
}

export const getHistoriaFile = async (historiaId) => {
  try {
    const response = await axios.get(`${API_URL}/historia/file/${historiaId}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error getting historia file:', error);
    throw error;
  }
};

export const createHistoria = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/historia`, data, {
      headers: {
        'Content-Type': 'application/json' // Changed from multipart/form-data
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating historia:', error);
    throw error;
  }
};

export const updateHistoria = async (historiaId, data) => {
  try {
    const response = await axios.put(`${API_URL}/historia/${historiaId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating historia:', error);
    throw error;
  }
};