import axios from 'axios';
import {API_URL} from './apiConfig';


export const getUsuarios = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error getting usuarios:', error);
        throw error;
    }
}

export const getUsuario = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting usuario:', error);
        throw error;
    }
}

export const createUsuario = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/users`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating usuario:', error);
        throw error;
    }
}

export const updateUsuario = async (userId, data) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating usuario:', error);
        throw error;
    }
}

export const deleteUsuario = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting usuario:', error);
        throw error;
    }
}

