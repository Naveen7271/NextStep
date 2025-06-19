import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001'; // Change if backend runs on a different port

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
  return response.data;
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
}; 