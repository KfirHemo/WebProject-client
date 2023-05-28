import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';

/* HTTP method types enum */
export enum methodTypes {
    Any = 'Any',
    Post = 'Post',
    Get = 'Get',
    Delete = 'Delete',
}

/* Mock API call type */
export interface MockApiCall {
    method: methodTypes;
    url: string;
    response: {
        status: number;
        data: any;
    };
}


/* Mock axios service adapter that replaces the server connection in test mode. */
let mockAdapter: MockAdapter;

export const createMockService = (apiService: AxiosInstance) => {
    mockAdapter = new MockAdapter(apiService);
};

/* This function receives an object array that includes the mock API calls and response,
   and then sets them to the mock adapter according to the HTTP method type.

   The mock object format is:
   {
    method: methodTypes.x,
    url: '/...',
    response: {
      status: *Number*,
      data: {
        ...
      }
    },
   }

  method: The HTTP method for the request (Any, Post, Get, Delete)
  url: The HTTP URL for the request, must begin with '/'
  response: The response object returned from the server
  status: A number that represents the status returned from the server (200, 404, etc.)
  data: The data passed in the response (user data, course data, etc...)

  See example for use in apiService.js file.
*/
export const addMockApiCalls = (mocks: MockApiCall[]) => {
    // Check a parameter was passed and it's an array, and that the mock adapter was created.
    if (!mocks || !Array.isArray(mocks) || !mockAdapter) {
        return;
    }

    // For each mock in the mocks array parameter, extract from it the method, URL, and response, and add the corresponding event.
    mocks.forEach(({ method, url, response }) => {
        switch (method) {
            case methodTypes.Any:
                mockAdapter.onAny(url).reply(response.status, response.data);
                break;
            case methodTypes.Post:
                mockAdapter.onPost(url).reply(response.status, response.data);
                break;
            case methodTypes.Get:
                mockAdapter.onGet(url).reply(response.status, response.data);
                break;
            case methodTypes.Delete:
                mockAdapter.onDelete(url).reply(response.status, response.data);
                break;
            default:
                console.log('Invalid method:', method);
                break;
        }
    });
};