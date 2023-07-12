import { Course, User } from './types';
import apiService from './apiService';

interface TeacherDataOperations {
    getCoursesOfTeacher(userId: Number): Promise<Course[]>;
    getStudentsInCourse(userId: number, courseId: number): Promise<User[]>;
    addGradeForStudent(userId: number, courseId: number, grade: number, description: string): Promise<any>;
    updateGradeForStudent(userId: number, courseId: number, grade: number, description: string): Promise<any>
    removeGradeForStudent(userId: number, courseId: number, description: string): Promise<number>
}

export const teacherDataOperations: TeacherDataOperations = {
    getCoursesOfTeacher: async (userId: Number): Promise<Course[]> => {
        try {
            const { data } = await apiService.get('/GetCoursesForTeacher', { params: { userId } });
            return data;
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getStudentsInCourse: async (userId: number, courseId: number): Promise<User[]> => {
        try {
            const { data } = await apiService.get('/GetStudentsInCourse', { params: { userId, courseId } });
            return data;
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    addGradeForStudent: async (userId: number, courseId: number, score: number, description: string): Promise<any> => {
        try {
          const { data } = await apiService.post('/AddGradeForStudent', { userId, courseId, score, description });
          return data;
        } catch (error: any) {
          console.error(error);
          throw error;
        }
      }
      ,

    updateGradeForStudent: async (userId: number, courseId: number, grade: number, description: string): Promise<any> => {
        try {
            const { data } = await apiService.post('/UpdateGradeForStudent', { params: { userId: userId, courseId: courseId, grade: grade, description: description } });
            return data;
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    removeGradeForStudent: async (userId: number, courseId: number, description: string): Promise<number> => {
        try {
            const { data } = await apiService.delete('/RemoveGradeForStudent', { params: { userId, courseId, description } });
            return data;
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    }
};
