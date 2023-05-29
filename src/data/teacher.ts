import { AxiosInstance, AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { Course, Grade, User } from './types';

interface TeacherDataOperations {
    getCoursesOfTeacher(teacher: User): AxiosPromise<Course[]>;
    getStudentsInCourse(teacher: User, course: Course): AxiosPromise<User[]>;
    addGradeForStudent(student: User, course: Course, grade: number, description: string): AxiosPromise<void>;
    updateGradeForStudent(grade: Grade,): AxiosPromise<void>
    removeGradeForStudent(grade: Grade,): AxiosPromise<number>
}

export const teacherDataOperations: TeacherDataOperations = {
    getCoursesOfTeacher: async (teacher: User): AxiosPromise<Course[]> => {
        try {
            const { name } = teacher;
            const apiService: AxiosInstance = await getApiService();
            return apiService.get('/GetCoursesForTeacher', { params: { name } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    getStudentsInCourse: async (teacher: User, course: Course): AxiosPromise<User[]> => {
        try {
            const teacherName = teacher.name, courseName = course.name;
            const apiService: AxiosInstance = await getApiService();
            return apiService.get('/GetStudentsInCourse', { params: { teacherName, courseName } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    addGradeForStudent: async (
        student: User,
        course: Course,
        grade: number,
        description: string
    ): AxiosPromise<void> => {
        try {
            const studentName = student.name, courseName = course.name;
            const apiService: AxiosInstance = await getApiService();
            return apiService.post('/AddGradeForStudent', { studentName, courseName, grade, description });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    updateGradeForStudent: async (grade: Grade): AxiosPromise<void> => {
        try {
            const { student, course, score, description } = grade;
            const studentName = student.name, courseName = course.name;
            const apiService: AxiosInstance = await getApiService();
            return apiService.post('/UpdateGradeForStudent', { studentName, courseName, score, description });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    removeGradeForStudent: async (grade: Grade): AxiosPromise<number> => {
        try {
            const { student, course, description } = grade;
            const studentName = student.name, courseName = course.name;
            const apiService: AxiosInstance = await getApiService();
            return apiService.delete('/RemoveGradeForStudent', { params: { studentName, courseName, description } });
        } catch (error: any) {
            console.error(error);
            return Promise.reject(error);
        }
    }
};
