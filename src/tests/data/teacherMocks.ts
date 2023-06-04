import { MockApiCall, addMockApiCalls, methodTypes } from "./apiServiceMocks";

const mocks: MockApiCall[] = [
    {
        method: methodTypes.Get,
        url: '/GetStudentsInCourse',
        response: {
            status: 200,
            data: [
                { id: 1, name: 'User4', type: 'student', password: '1234' },
                { id: 2, name: 'User5', type: 'student', password: '1234' },
                { id: 3, name: 'User4', type: 'student', password: '1234' },
                { id: 4, name: 'User5', type: 'student', password: '1234' },
                { id: 5, name: 'User4', type: 'student', password: '1234' },
                { id: 6, name: 'User5', type: 'student', password: '1234' },
                { id: 1, name: 'User4', type: 'student', password: '1234' },
                { id: 2, name: 'User5', type: 'student', password: '1234' },
                { id: 3, name: 'User4', type: 'student', password: '1234' },
                { id: 4, name: 'User5', type: 'student', password: '1234' },
                { id: 5, name: 'User4', type: 'student', password: '1234' },
                { id: 6, name: 'User5', type: 'student', password: '1234' },
            ]
        },
    },
    {
        method: methodTypes.Post,
        url: '/AddGradeForStudent',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: methodTypes.Delete,
        url: '/UpdateGradeForStudent',
        response: {
            status: 200,
            data: {},
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
        url: '/RemoveGradeForStudent',
        response: {
            status: 200,
            data: { id: 2 },
        },
    },
    {
        method: methodTypes.Get,
        url: '/GetCoursesForTeacher',
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
