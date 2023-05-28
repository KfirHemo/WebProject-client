export enum UserType {
    Manager = 'manager',
    Student = 'student',
    Teacher = 'teacher',
}

export interface User {
    name: string;
    password: string;
    type: UserType;
}

export interface Teacher {
    id: string;
    name: string;
}

export interface Course {
    id: string;
    name: string;
    code: string;
}