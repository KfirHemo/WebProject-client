import { AxiosInstance, AxiosPromise, AxiosError } from 'axios';
import { getApiService } from './apiService';
import * as config from './config';
import { User, Course, Teacher, UserType } from './types';
import { setupMocks } from '../tests/data/managerMocks';

if (config.TEST_MODE) {
  setupMocks();
}

export const getUsers = async (userType: UserType | undefined): AxiosPromise<any> => {
  const type = userType || '';
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.get('/GetUsers', { params: { type } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const addUser = async (user: User): AxiosPromise<any> => {
  const { name, password, type } = user;
  if (!name || !password || !type)
    return Promise.reject(null);
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.post('/AddUser', { params: { name, password, type } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const removeUser = async ({ name }: User): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.delete('/RemoveUser', { params: { name } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const addCourse = async (course: Course): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.post('/AddCourse', course);
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const removeCourse = async ({ name }: Course): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.delete('/RemoveCourse', { params: { courseName: name } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const addCourseForTeacher = async (
  teacherName: string,
  courseName: string
): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.post('/AddCourseForTeacher', { teacherName, courseName });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const removeTeacherFromCourse = async (
  teacherName: string,
  courseName: string
): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.delete('/RemoveTeacherFromCourse', { params: { teacherName, courseName } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const getCourses = async (): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.get('/GetCourses');
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

export const getCoursesOfTeacher = async (
  teacherName: string
): AxiosPromise<any> => {
  try {
    const apiService: AxiosInstance = await getApiService();
    return apiService.get('/GetCoursesOfTeacher', { params: { teacherName } });
  } catch (e: any) {
    console.error(e);
    return e;
  }
};
