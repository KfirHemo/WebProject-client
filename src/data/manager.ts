import { AxiosPromise } from 'axios';
import { getApiService } from './apiService';
import { UserType, User, Course } from './types';
import *  as config from './config';
import { setupMocks } from '../tests/data/managerMocks';
import { teacherDataOperations } from './teacher';
if (config.TEST_MODE) 
  setupMocks();

interface ManagerDataOperations {
  getUsers(userType?: UserType): AxiosPromise<User[]>;
  addUser(user: User): AxiosPromise<number>;
  removeUser(user: User): AxiosPromise<number>;
  addCourse(course: Course): AxiosPromise<number>;
  removeCourse(course: Course): AxiosPromise<number>;
  addCourseForTeacher(teacherName: string, courseName: string): AxiosPromise<void>;
  removeTeacherFromCourse(teacherName: string, courseName: string): AxiosPromise<void>;
  getCourses(): AxiosPromise<Course[]>;
  getCoursesOfTeacher(teacher: User): AxiosPromise<Course[]>;
}

export const managerDataOperations: ManagerDataOperations = {
  getUsers: async (userType?: UserType): AxiosPromise<User[]> => {
    const type = userType || '';
    try {
      const apiService = await getApiService();
      return apiService.get('/GetUsers', { params: { type } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addUser: async (user: User): AxiosPromise<number> => {
    const { name, password, type } = user;
    if (!name || !password || !type) return Promise.reject(null);
    try {
      const apiService = await getApiService();
      return apiService.post('/AddUser', { params: { name, password, type } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeUser: async (user: User): AxiosPromise<number> => {
    try {
      const apiService = await getApiService();
      return apiService.delete('/RemoveUser', { params: { name: user.name } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourse: async (course: Course): AxiosPromise<number> => {
    try {
      const apiService = await getApiService();
      return apiService.post('/AddCourse', course);
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeCourse: async (course: Course): AxiosPromise<number> => {
    try {
      const apiService = await getApiService();
      return apiService.delete('/RemoveCourse', { params: { courseName: course.name } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourseForTeacher: async (teacherName: string, courseName: string): AxiosPromise<void> => {
    try {
      const apiService = await getApiService();
      return apiService.post('/AddCourseForTeacher', { teacherName, courseName });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeTeacherFromCourse: async (teacherName: string, courseName: string): AxiosPromise<void> => {
    try {
      const apiService = await getApiService();
      return apiService.delete('/RemoveTeacherFromCourse', { params: { teacherName, courseName } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  getCourses: async (): AxiosPromise<Course[]> => {
    try {
      const apiService = await getApiService();
      return apiService.get('/GetCourses');
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  getCoursesOfTeacher: async (teacher: User): AxiosPromise<Course[]> => {
    return teacherDataOperations.getCoursesOfTeacher(teacher);
  },
};
