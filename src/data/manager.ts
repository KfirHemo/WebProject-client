import { UserType, User, Course } from './types';
import { teacherDataOperations } from './teacher';
import apiService from './apiService';

interface ManagerDataOperations {
  getUsers(userType?: UserType): Promise<User[]>;
  addUser(user: User): Promise<number>;
  removeUser(user: User): Promise<number>;
  addCourse(courseName: string): Promise<number>;
  removeCourse(courseId: number): Promise<number>;
  addCourseForTeacher(userId: number, courseId: number): Promise<any>;
  removeTeacherFromCourse(userId: number, courseId: number): Promise<any>;
  getCourses(): Promise<Course[]>;
  getCoursesOfTeacher(userId: Number): Promise<Course[]>;
}

export const managerDataOperations: ManagerDataOperations = {
  getUsers: async (userType?: UserType): Promise<User[]> => {
    const type = userType || '';
    try {
      const { data } = await apiService.get('/GetUsers', { params: { type } });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addUser: async (user: User): Promise<number> => {
    try {
      const { data } = await apiService.post('/AddUser', user);
      return data;
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  }
  ,

  removeUser: async (user: User): Promise<number> => {
    try {
      const { id } = user;
      const { data } = await apiService.delete('/RemoveUser', { params: { userId: id } });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourse: async (courseName: string): Promise<number> => {
    try {
      const { data } = await apiService.post('/AddCourse', { params: { courseName } });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeCourse: async (courseId: number): Promise<number> => {
    try {
      const { data } = await apiService.delete('/RemoveCourse', { params: { courseId } });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  addCourseForTeacher: async (userId: number, courseId: number): Promise<any> => {
    try {
      const { data } = await apiService.post('/AddCourseForTeacher', { userId, courseId });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  removeTeacherFromCourse: async (userId: number, courseId: number): Promise<any> => {
    try {
      const { data } = await apiService.delete('/RemoveTeacherFromCourse', { params: { userId, courseId } });
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  getCourses: async (): Promise<Course[]> => {
    try {
      const { data } = await apiService.get('/GetCourses');
      return data;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  },

  getCoursesOfTeacher: async (userId: Number): Promise<Course[]> => {
    return teacherDataOperations.getCoursesOfTeacher(userId);
  },
};
