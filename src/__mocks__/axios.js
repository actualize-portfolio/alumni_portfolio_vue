const httpResult = { data: { foo: "bar" }, status: 200 };

export const getSpy = jest.fn(() => Promise.resolve(httpResult));
export const postSpy = jest.fn(() => Promise.resolve(httpResult));
export const deleteSpy = jest.fn(() => Promise.resolve(httpResult));

export default {
  defaults: {
    baseUrl: undefined,
    timeout: undefined,
  },
  create: jest.fn(() => {
    return {
      defaults: {
        baseURL: "http://localhost:3000/api/v1",
        timeout: "60000",
      },
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
      get: getSpy,
      post: postSpy,
      delete: deleteSpy,
    };
  }),
};
