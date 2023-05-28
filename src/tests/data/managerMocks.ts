import { MockApiCall, addMockApiCalls, methodTypes } from "./apiServiceMocks";

const mocks: MockApiCall[] = [
    {
        method: methodTypes.Post,
        url: '/AddUser',
        response: {
            status: 200,
            data: { id: 1 },
        },
    },
    {
        method: methodTypes.Delete,
        url: '/RemoveUser',
        response: {
            status: 200,
            data: { id: 1 },
        },
    },
    {
        method: methodTypes.Post,
        url: '/AddCourse',
        response: {
            status: 200,
            data: { id: 2 },
        },
    },
    {
        method: methodTypes.Delete,
        url: '/RemoveCourse',
        response: {
            status: 200,
            data: { id: 2 },
        },
    },
    {
        method: methodTypes.Post,
        url: '/AddCourseForTeacher',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: methodTypes.Delete,
        url: '/RemoveTeacherFromCourse',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: methodTypes.Get,
        url: '/GetUsers',
        response: {
            status: 200,
            data: [
                { id: 2, name: 'User2', type: 'teacher', password: '1234' },
                { id: 3, name: 'User3', type: 'teacher', password: '1234' },
                { id: 4, name: 'User4', type: 'student', password: '1234' },
                { id: 5, name: 'User5', type: 'student', password: '1234' },
                { id: 6, name: 'User6', type: 'student', password: '1234' },
            ],
        },
    },
    {
        method: methodTypes.Get,
        url: '/GetCourses',
        response: {
            status: 200,
            data: [
                { id: 1, name: 'Calc1' },
                { id: 2, name: 'Calc2' },
                { id: 3, name: 'Intro to CS' },
                { id: 4, name: 'Algorithms' },
                { id: 5, name: 'Logic' },
                { id: 6, name: 'Automata' },
            ],
        },
    },
    {
        method: methodTypes.Get,
        url: '/GetCoursesOfTeacher',
        response: {
            status: 200,
            data: [
                { id: 4, name: 'Algorithms' },
                { id: 5, name: 'Logic' },
                { id: 6, name: 'Automata' },
            ],
        },
    },
];

export const setupMocks = (): void => {
    addMockApiCalls(mocks);
};
