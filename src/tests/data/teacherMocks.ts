import { MockApiCall } from "./apiServiceMocks";

export const teacherMocks: MockApiCall[] = [
    {
        method: 'Get',
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
        method: 'Post',
        url: '/AddGradeForStudent',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: 'Post',
        url: '/UpdateGradeForStudent',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: 'Post',
        url: '/AddCourseForTeacher',
        response: {
            status: 200,
            data: {},
        },
    },
    {
        method: 'Delete',
        url: '/RemoveGradeForStudent',
        response: {
            status: 200,
            data: { id: 2 },
        },
    },
    {
        method: 'Get',
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