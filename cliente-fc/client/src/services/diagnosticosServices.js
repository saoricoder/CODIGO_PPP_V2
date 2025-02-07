import axios from 'axios';

import {API_URL} from './apiConfig';

const getDiagnosticos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getDiagnosticoById = async (id_enfermedad, id_aps) => {
  const response = await axios.get(`${API_URL}/${id_enfermedad}/${id_aps}`);
  return response.data;
};

const createDiagnostico = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const updateDiagnostico = async (id_enfermedad, id_aps, data) => {
  const response = await axios.put(`${API_URL}/${id_enfermedad}/${id_aps}`, data);
  return response.data;
};

const deleteDiagnostico = async (id_enfermedad, id_aps) => {
  const response = await axios.delete(`${API_URL}/${id_enfermedad}/${id_aps}`);
  return response.data;
};

const getEnfermedadesByAPS = async (id_aps) => {
    const response = await axios.get(`${API_URL}/enfermedades/aps/${id_aps}`);
    return response.data;
  };

export {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
  getEnfermedadesByAPS,
};
