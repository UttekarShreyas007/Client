import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const getProperties = async () => {
  const response = await axios.get(`${baseUrl}/properties`);
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await axios.get(`${baseUrl}/properties/${id}`);
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await axios.post(`${baseUrl}/properties`, propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await axios.put(`${baseUrl}/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await axios.delete(`${baseUrl}/properties/${id}`);
  return response.data;
};
