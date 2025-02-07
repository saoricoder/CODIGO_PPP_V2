import axios from 'axios';

import {API_URL} from './apiConfig';

export const getExamenes = async () => {
    try {
        const response = await axios.get(`${API_URL}/examen`);
        return response.data;
    } catch (error) {
        console.error('Error getting examenes:', error);
        throw error;
    }
    };

export const getExamen = async (examenId) => {
    try {
        const response = await axios.get(`${API_URL}/examen/${examenId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting examen:', error);
        throw error;
    }
}

export const createExamen = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/examen`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating examen:', error);
        throw error;
    }
}

export const updateExamen = async (examenId, data) => {
    try {
        const response = await axios.put(`${API_URL}/examen/${examenId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating examen:', error);
        throw error;
    }
}

export const deleteExamen = async (examenId) => {
    try {
        const response = await axios.delete(`${API_URL}/examen/${examenId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting examen:', error);
        throw error;
    }
}

export const getExamenByHistoria = async (historiaId) => {
    try {
        const response = await axios.get(`${API_URL}/examen/historia/${historiaId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting examen by historia:', error);
        throw error;
    }
}
