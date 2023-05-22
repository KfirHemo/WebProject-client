import { getApiService } from './apiService';

export const getUsers = async (username, password) => {
    try {
        const apiService = await getApiService();
        return apiService.get(`/CheckUserLogin?username=${username}&password=${password}`);
    } catch (e) {
        console.error(e);
        return null;
    }
};

// Example POST request
export const createUser = async (userData) => {
    try {
        const apiService = await getApiService();
        return apiService.post('/users', userData);
    } catch (e) {
        console.error(e);
    }
};

// Example PUT request
export const updateUser = async (userId, userData) => {
    try {
        const apiService = await getApiService();
        return apiService.post('/users', userData);
    } catch (e) {
        console.error(e);
    }
};

// Example DELETE request
export const deleteUser = async (userId) => {
    try {
        const apiService = await getApiService();
        return apiService.post('/users', userData);
    } catch (e) {
        console.error(e);
    }
};