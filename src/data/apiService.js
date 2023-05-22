import axios from 'axios';

const API_BASE_URL = 'https://127.0.0.1:5000';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getApiService = async () => {
  return apiService;
}
