import { AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { Course, Grade } from './types';
import *  as config from './config';
import { setupMocks } from '../tests/data/studentMocks';
if (config.TEST_MODE)
    setupMocks();

interface StudentDataOperations {
    getCoursesOfStudent(userId: number): AxiosPromise<Course[]>;
    getGradesOfStudentInCourse(userId: number, courseId: number): AxiosPromise<Grade[]>;
}

export const studentDataOperations: StudentDataOperations = {
    getCoursesOfStudent: async (userId: number): AxiosPromise<Course[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetCoursesOfStudent', { params: { userId } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },

    getGradesOfStudentInCourse: async (userId: number, courseId: number): AxiosPromise<Grade[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetGradesOfStudentInCourse', { params: { userId, courseId } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },
};
