import { Course, Grade } from './types';
import apiService from './apiService';

interface StudentDataOperations {
    getCoursesOfStudent(userId: number): Promise<Course[]>;
    getGradesOfStudentInCourse(userId: number, courseId: number): Promise<Grade[]>;
}

export const studentDataOperations: StudentDataOperations = {
    getCoursesOfStudent: async (userId: number): Promise<Course[]> => {
        try {
            const { data } = await apiService.get('/GetCoursesOfStudent', { params: { userId } });
            return data;
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },

    getGradesOfStudentInCourse: async (userId: number, courseId: number): Promise<Grade[]> => {
        try {
            const { data } = await apiService.get('/GetGradesOfStudentInCourse', { params: { userId, courseId } });
            return data;
        } catch (e: any) {
            console.error(e);
            return e;
        }
    },
};
