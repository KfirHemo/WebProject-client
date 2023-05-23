import axios from 'axios';
import * as config from './config.js';
import { addMockApiCalls, createMockService, methodTypes } from '../tests/data/apiServiceMocks.js';

const apiService = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
if (config.TEST_MODE) {
  createMockService(apiService);
  addMockApiCalls([{
    method: methodTypes.Get,
    url: '/CheckUserLogin',
    response: {
      status: 200,
      data: {
        id: 1, name: 'Test User', type: 'Manager', password: '1234'
      }
    },
  }]);
}

export const getApiService = async () => {
  return apiService;
}

export const checkUserExists = async (user, pass) => {
  return await apiService.get('/CheckUserLogin', { params: { user, pass } });
}