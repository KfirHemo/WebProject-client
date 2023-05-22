import { getApiService } from './apiService';

export const getUsers = async () => {
    try {
        const apiService = await getApiService();
        return apiService.get('/GetUsers');
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

// Example DELETE request
export const deleteUser = async (userId) => {
    try {
        const apiService = await getApiService();
        return apiService.post('/users', userData);
    } catch (e) {
        console.error(e);
    }
};