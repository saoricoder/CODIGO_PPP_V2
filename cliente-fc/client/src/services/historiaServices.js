import axios from 'axios';
import { API_URL, BASE_API_URL } from './apiConfig';

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

export const createHistoria = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/historia`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
    console.log([...data.values()]);
    const response = await axios.put(`${API_URL}/historia/${historiaId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating historia:', error);
    throw error;
  }
};

export const getHistoriaFile = async (fileName) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/uploads/historia/${fileName}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error getting historia file:', error);
    throw error;
  }
};