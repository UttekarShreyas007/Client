import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

const signup = async (userData) => {
  const response = await axios.post(`${baseUrl}/signup`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}/login`, userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${baseUrl}/current_user`);
  return response.data;
};

export { signup, login, logout, getCurrentUser };
