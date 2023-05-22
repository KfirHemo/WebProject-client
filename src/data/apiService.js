import axios from 'axios';

const API_BASE_URL = 'https://localhost:7187';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getApiService = async () => {
  return apiService;
}

export const checkUserExists = async (user, pass) => {
  return await apiService.get(`/CheckUserLogin?username=${user}&password=${pass}`);
}