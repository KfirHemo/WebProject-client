import { AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { UserType, User, Course } from './types';

interface StudentDataOperations {
    getCoursesOfStudent(userId: number): AxiosPromise<Course[]>;
    getGradesOfStudentInCourse(username: string, courseName: string): AxiosPromise<Course[]>;
}

export const studentDataOperations: StudentDataOperations = {
    getCoursesOfStudent: async (userId: number): AxiosPromise<Course[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetCoursesOfStudent', { params: { userId  } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },

    getGradesOfStudentInCourse: async (username: string, courseName: string): AxiosPromise<Course[]> => {
        try {
            const apiService = await getApiService();
            return apiService.get('/GetGradesOfStudentInCourse', { params: { username, courseName } });
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },
};
