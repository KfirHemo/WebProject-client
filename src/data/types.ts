export enum UserType {
    Manager = 'manager',
    Student = 'student',
    Teacher = 'teacher',
}

export interface User {
    id: number;
    name: string;
    password: string;
    type: UserType;
}

export interface Course {
    id: number;
    name: string;
}

export interface Grade {
    id: number;
    student: User;
    course: Course;
    score: number;
    description?: string;
    created?: Date;
}

export interface UserInCourse {
    id: number;
    teacherId: number;
    courseId: number;
}