const successResponse = { data: { foo: "bar" }, errors: [] };

export default {
  get: jest.fn(() => Promise.resolve(successResponse)),
  post: jest.fn(() => Promise.resolve(successResponse)),
  delete: jest.fn(() => Promise.resolve(successResponse)),
};
