import axios from 'axios';

import {API_URL} from './apiConfig';

export const getLastSignosVitales = async (pacienteId) => {
    try {
        const response = await axios.get(`${API_URL}/signos_vitales/last/${pacienteId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting last signos vitales:', error);
        throw error;
    }
}

export const createSignosVitales = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signos_vitales`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating signos vitales:', error);
        throw error;
    }
}

export const getAtenciones = async(historiaId) => {
    try {
        const response = await axios.get(`${API_URL}/atencion/historia/${historiaId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting atenciones:', error);
        throw error;
    }
}

export const getAllAtenciones = async() => {
    try {
        const response = await axios.get(`${API_URL}/atencion`);
        return response.data;
    } catch (error) {
        console.error('Error getting atenciones:', error);
        throw error;
    }
}

export const createAtencion = async(data) => {
    try{
        console.log(data);
       const response = await axios.post(`${API_URL}/atencion`, data);
        return response.data;

    }
    catch(error){
        console.error('Error creating atencion:', error);
        throw error;
    }
}

export const getSignosVitalesPorAps = async(apsId) => {
    try {
        const response = await axios.get(`${API_URL}/signos_vitales/aps/${apsId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting signos vitales por aps:', error);
        throw error;
    }
}