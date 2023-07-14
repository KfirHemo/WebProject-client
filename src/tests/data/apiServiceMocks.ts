import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { UserType } from '../../data/types';
import { teacherMocks } from './teacherMocks';
import { managerMocks } from './managerMocks';
import { studentMocks } from './studentMocks';


/* method: The HTTP method for the request (Any, Post, Get, Delete)
  url: The HTTP URL for the request, must begin with '/'
  response: The response object returned from the server
  status: A number that represents the status returned from the server (200, 404, etc.)
  data: The data passed in the response (user data, course data, etc...) */
export interface MockApiCall {
    method: string;
    url: string;
    response: {
        status: number;
        data: any;
    };
}
const checkUserExistsMock: MockApiCall = {
    method: 'Get',
    url: '/CheckUserLogin',
    response: {
        status: 200,
        data: {
            id: 1,
            name: 'Test',
            type: UserType.Manager,
            password: '1234',
        },
    },
}

//array of mocks that consists of all the mock api calls for each data entity.
const mocks: MockApiCall[] = [
    checkUserExistsMock,
    ...teacherMocks,
    ...managerMocks,
    ...studentMocks
]

/* 
Initializes the mock api service for testing without connection to the server.
*/
export const initMockApiCalls = () => {
    try {
        /* Mock axios service adapter that replaces the server connection in test mode. */
        const mockAdapter = new MockAdapter(axios);
        // For each mock, extract from it the method, URL, and response, and add the corresponding event.
        mocks.forEach(({ method, url, response }) => {
            switch (method) {
                case 'Post':
                    mockAdapter.onPost(url).reply(response.status, response.data);
                    break;
                case 'Get':
                    mockAdapter.onGet(url).reply(response.status, response.data);
                    break;
                case 'Delete':
                    mockAdapter.onDelete(url).reply(response.status, response.data);
                    break;
                default:
                    console.log('Invalid method:', method);
                    break;
            }
        });
    } catch (e) {
        console.error(e);
    }
};