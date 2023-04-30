import axios from "axios";
import requestApi from "../lib/requestApi";

const BASE_URL = `${process.env.REACT_APP_API_URL}/properties`;

const getPropertyList = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const getPropertyById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const createProperty = async (property) => {
  const response = await axios.post(BASE_URL, property);
  return response.data;
};

const updateProperty = async (id, property) => {
  const response = await axios.put(`${BASE_URL}/${id}`, property);
  return response.data;
};

const deleteProperty = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

const fetchInterestedProperties = async () => {
  try {
    const response = await requestApi("/properties/interested");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching interested properties.");
  }
};
export { getPropertyList, getPropertyById, createProperty, updateProperty, deleteProperty, fetchInterestedProperties };
