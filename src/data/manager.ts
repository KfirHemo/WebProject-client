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
  addCourse(courseName: string): AxiosPromise<number>;
  removeCourse(courseId: number): AxiosPromise<number>;
  addCourseForTeacher(userId: number, courseId: number): AxiosPromise<void>;
  removeTeacherFromCourse(userId: number, courseId: number): AxiosPromise<void>;
  getCourses(): AxiosPromise<Course[]>;
  getCoursesOfTeacher(userId: Number): AxiosPromise<Course[]>;
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
      return apiService.post('/AddUser', { params: { username: name,password: password,type: type } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeUser: async (user: User): AxiosPromise<number> => {
    try {
      const { id } = user;
      const apiService = await getApiService();
      return apiService.delete('/RemoveUser', { params: {userId: id } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourse: async (courseName: string): AxiosPromise<number> => {
    try {
      const apiService = await getApiService();
      return apiService.post('/AddCourse', { params: { courseName } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeCourse: async (courseId: number): AxiosPromise<number> => {
    try {
      const apiService = await getApiService();
      return apiService.delete('/RemoveCourse', { params: { courseId } });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourseForTeacher: async (userId: number, courseId: number): AxiosPromise<void> => {
    try {
      const apiService = await getApiService();
      return apiService.post('/AddCourseForTeacher', { userId, courseId });
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeTeacherFromCourse: async (userId: number, courseId: number): AxiosPromise<void> => {
    try {
      const apiService = await getApiService();
      return apiService.delete('/RemoveTeacherFromCourse', { params: { userId, courseId } });
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

  getCoursesOfTeacher: async (userId: Number): AxiosPromise<Course[]> => {
    return teacherDataOperations.getCoursesOfTeacher(userId);
  },
};
