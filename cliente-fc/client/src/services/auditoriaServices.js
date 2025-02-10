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

export const detalle_data = (data) => {
  let varibles_data = {};

  // Obtener las claves, excluir "tabla" e "id" y concatenarlas
  const nombres = Object.keys(data)
    .filter((key) => key !== "tabla" && key !== "id") // Excluir las propiedades "tabla" e "id"
    .join(", "); // Concatenar con coma

  //Obtener los valores excluir los valor de tabla e id
  const valores = Object.entries(data)
    .filter(([key]) => key !== "tabla" && key !== "id") // Filtrar claves "tabla" e "id"
    .map(([key, value]) => `'${value}'`) // Poner cada valor entre comillas
    .join(", "); // Concatenar con coma

  //dar formato nombre="valor"
  const resultado = Object.entries(data)
    .filter(([key]) => key !== "tabla" && key !== "id") // Excluir propiedades
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ");

  //obtner solo el id
  const id = Object.entries(data)
    .filter(([key]) => key === "id") // solo esta propiedades
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ");

  //variables de consulta sql

  const insertSql =
    "INSERT INTO " + data.tabla + " (" + nombres + ")VALUES (" + valores + ");";
  const selectTodoSql = "SELECT " + nombres + " FROM " + data.tabla;
  const updateSql =
    "UPDATE " + data.tabla + " SET " + resultado + " WHERE " + id;
  const deleteSql = "DELETE FROM " + data.tabla + " WHERE " + id;
  const selectIdSql =
    "SELECT " + nombres + " FROM " + data.tabla + " WHERE " + id;

  varibles_data.insertSql = insertSql;
  varibles_data.selectTodoSql = selectTodoSql;
  varibles_data.selectIdSql = selectIdSql;
  varibles_data.updateSql = updateSql;
  varibles_data.deleteSql = deleteSql;

  return varibles_data;
};
