import axios from "axios";
import { API_URL } from "./apiConfig";

export const createAuditoria = async (data = {}) => {
  try {
    const response = await axios.post(`${API_URL}/auditoria`, data);
    console.log("creando auditoria");
    return response.data;
  } catch (error) {
    console.log("Error create auditorias", error);
    throw error;
  }
};
export const getAuditorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/auditoria`);
    console.log("getAuditorias");
    return response.data;
  } catch (error) {
    console.log("Error getting auditorias", error);
    throw error;
  }
};

export const getAuditoria = async (auditoriaId) => {
  try {
    const response = await axios.post(`${API_URL}/auditoria/${auditoriaId}`);
    console.log("getAuditoriasID");
    console.log(auditoriaId);
    return response.data;
  } catch (error) {
    console.error("Error getting auditoria:", error);
    throw error;
  }
};

export const updateAuditoria = async (auditoriaId, data) => {
  try {
    console.log("updateAuditoriasID");
    console.log(auditoriaId);
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAuditoria = async (auditoriaId) => {
  try {
    console.log("deleteAuditoria");
    console.log(auditoriaId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
