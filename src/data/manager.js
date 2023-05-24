import { setupMocks } from '../tests/data/managerMocks';
import { getApiService } from './apiService';
import * as config from './config.js';

if (config.TEST_MODE) {
  setupMocks();
}

export const getUsers = async (type = "") => {
  try {
    const apiService = await getApiService();
    return apiService.get('/GetUsers', { params: { type } });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addUser = async (username, password, type) => {
  if (!username || !password || !type)
    return null;
  try {
    const apiService = await getApiService();
    return apiService.post('/AddUser', { params: { username, password, type } });
  } catch (e) {
    console.error(e);
  }
};

export const removeUser = async (username) => {
  try {
    const apiService = await getApiService();
    return apiService.delete('/RemoveUser', { params: { username } });
  } catch (e) {
    console.error(e);
  }
};

export const addCourse = async (courseName) => {
  try {
    const apiService = await getApiService();
    return apiService.post('/AddCourse', { courseName });
  } catch (e) {
    console.error(e);
  }
};

export const removeCourse = async (courseName) => {
  try {
    const apiService = await getApiService();
    return apiService.delete('/RemoveCourse', { params: { courseName } });
  } catch (e) {
    console.error(e);
  }
};

export const addCourseForTeacher = async (teacherName, courseName) => {
  try {
    const apiService = await getApiService();
    return apiService.post('/AddCourseForTeacher', { teacherName, courseName });
  } catch (e) {
    console.error(e);
  }
};

export const removeTeacherFromCourse = async (teacherName, courseName) => {
  try {
    const apiService = await getApiService();
    return apiService.delete('/RemoveTeacherFromCourse', { params: { teacherName, courseName } });
  } catch (e) {
    console.error(e);
  }
};

export const getCourses = async () => {
  try {
    const apiService = await getApiService();
    return apiService.get('/GetCourses');
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getCoursesOfTeacher = async (teacherName) => {
  try {
    const apiService = await getApiService();
    return apiService.get('/GetCoursesOfTeacher', { params: { teacherName } });
  } catch (e) {
    console.error(e);
    return null;
  }
};


