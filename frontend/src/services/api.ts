import axios from 'axios';

const API_URL = '/api';

// Auth API calls
export const register = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Job API calls
export const createJob = async (jobData: any) => {
  const response = await axios.post(`${API_URL}/addjob`, jobData);
  return response.data;
};

export const getJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

export const updateJob = async (id: string, jobData: any) => {
  const response = await axios.put(`${API_URL}/updatejob/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await axios.delete(`${API_URL}/deletejob/${id}`);
  return response.data;
}; 