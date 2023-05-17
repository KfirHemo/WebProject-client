import axios from 'axios';

const API_BASE_URL = 'https://localhost:7187';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example GET request
export const getUsers = (username, password) => {
  return apiService.get(`/CheckUserLogin?username=${username}&password=${password}`);
};

// Example POST request
export const createUser = (userData) => {
  return apiService.post('/users', userData);
};

// Example PUT request
export const updateUser = (userId, userData) => {
  return apiService.put(`/users/${userId}`, userData);
};

// Example DELETE request
export const deleteUser = (userId) => {
  return apiService.delete(`/users/${userId}`);
};
