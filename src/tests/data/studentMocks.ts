import { MockApiCall } from "./apiServiceMocks";

export const studentMocks: MockApiCall[] = [
    {
        method: 'Get',
        url: '/GetCoursesOfStudent',
        response: {
            status: 200,
            data: [
                { id: 4, name: 'Algorithms' },
                { id: 6, name: 'Automata' },
            ]
        },
    },
    {
        method: 'Get',
        url: '/GetGradesOfStudentInCourse',
        response: {
            status: 200,
            data: [
                { id: 23, userId: 3, courseId: 4, score: 89, description: 'HW1', created: '2023-01-04T:12:34:00' },
                { id: 24, userId: 3, courseId: 4, score: 96, description: 'HW2', created: '2023-02-03T:12:34:00' },
                { id: 25, userId: 3, courseId: 4, score: 55, description: 'HW3', created: '2023-03-04T:11:34:00' },
                { id: 26, userId: 3, courseId: 4, score: 93, description: 'HW4', created: '2023-05-04T:12:34:00' },

            ],
        },
    },
];