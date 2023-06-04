import { AxiosInstance, AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { Course, User } from './types';
import *  as config from './config';
import { setupMocks } from '../tests/data/teacherMocks';
if (config.TEST_MODE)
    setupMocks();

interface TeacherDataOperations {
    getCoursesOfTeacher(userId: Number): AxiosPromise<Course[]>;
    getStudentsInCourse(userId: number, courseId: number): AxiosPromise<User[]>;
    addGradeForStudent(userId: number, courseId: number, grade: number, description: string): AxiosPromise<void>;
    updateGradeForStudent(userId: number, courseId: number, grade: number, description: string): AxiosPromise<void>
    removeGradeForStudent(userId: number, courseId: number, description: string): AxiosPromise<number>
}

export const teacherDataOperations: TeacherDataOperations = {
    getCoursesOfTeacher: async (userId: Number): AxiosPromise<Course[]> => {
        try {
            const apiService: AxiosInstance = await getApiService();
            return apiService.get('/GetCoursesForTeacher', { params: { userId } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getStudentsInCourse: async (userId: number, courseId: number): AxiosPromise<User[]> => {
        try {
            const apiService: AxiosInstance = await getApiService();
            return apiService.get('/GetStudentsInCourse', { params: { userId, courseId } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    addGradeForStudent: async (userId: number, courseId: number, grade: number, description: string): AxiosPromise<void> => {
        try {
            const apiService: AxiosInstance = await getApiService();
            return apiService.post('/AddGradeForStudent', { userId, courseId, grade, description });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    updateGradeForStudent: async (userId: number, courseId: number, grade: number, description: string): AxiosPromise<void> => {
        try {
            const apiService: AxiosInstance = await getApiService();
            return apiService.post('/UpdateGradeForStudent', { userId, courseId, grade, description });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    removeGradeForStudent: async (userId: number, courseId: number, description: string): AxiosPromise<number> => {
        try {
            const apiService: AxiosInstance = await getApiService();
            return apiService.delete('/RemoveGradeForStudent', { params: { userId, courseId, description } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    }
};
