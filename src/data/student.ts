import { AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { Course, Grade } from './types';

interface StudentDataOperations {
    getCoursesOfStudent(username: string): AxiosPromise<Course[]>;
    getGradesOfStudentInCourse(username: string, courseName: string): AxiosPromise<Grade[]>;
}

export const studentDataOperations: StudentDataOperations = {
    getCoursesOfStudent: async (username: string): AxiosPromise<Course[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetCoursesOfStudent', { params: { username } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },

    getGradesOfStudentInCourse: async (username: string, courseName: string): AxiosPromise<Grade[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetGradesOfStudentInCourse', { params: { username, courseName } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },
};
