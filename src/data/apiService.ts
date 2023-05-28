import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
import * as config from './config';
import { addMockApiCalls, createMockService, methodTypes } from '../tests/data/apiServiceMocks';
import { User, UserType } from './types';

const apiService: AxiosInstance = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (config.TEST_MODE) {
  createMockService(apiService);
  addMockApiCalls([
    {
      method: methodTypes.Get,
      url: '/CheckUserLogin',
      response: {
        status: 200,
        data: {
          id: 1,
          name: 'Test User',
          type: UserType.Manager,
          password: '1234',
        },
      },
    },
  ]);
}

export const getApiService = async (): Promise<AxiosInstance> => {
  return apiService;
};

export const checkUserExists = async (username: string, password: string): AxiosPromise<any> => {
  return apiService.get('/CheckUserLogin', { params: { username, password } });
};
