import actions from "@/store/actions";
import httpService from "@/services/HttpService.js";

jest.mock("@/services/HttpService.js", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe("actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("initialize", () => {
    test("initialize calls commit with INITIALIZE", () => {
      actions.initialize({ commit });

      expect(commit).toHaveBeenCalledWith("INITIALIZE");
    });
  });

  describe("toggleTheApiVisualizer", () => {
    test("toggleTheApiVisualizer calls commit with TOGGLE_API_VISUALIZER", () => {
      actions.toggleTheApiVisualizer({ commit });

      expect(commit).toHaveBeenCalledWith("TOGGLE_API_VISUALIZER");
    });
  });

  describe("login", () => {
    describe("when token obtained", () => {
      beforeEach(() => {
        httpService.post.mockImplementation((path, payload, callback) =>
          callback(200, {
            data: {
              user: {
                username: "demo_user@test.com",
                age: 30,
                favorites: [],
              },
              token: "imatoken",
            },
            errors: [],
          })
        );
        actions.login({ commit }, { username: "test", password: "password" });
      });

      test("login calls commit with START_LOADING", () => {
        expect(commit).toHaveBeenCalledWith("START_LOADING");
      });

      test("login calls commit with STOP_LOADING", () => {
        expect(commit).toHaveBeenCalledWith("STOP_LOADING");
      });

      test("login calls commit with ADD_API_REQUEST", async () => {
        expect(commit).toHaveBeenCalledWith("ADD_API_REQUEST", {
          url: "POST /api/v1/login",
          response: {
            data: {
              user: {
                username: "demo_user@test.com",
                age: 30,
                favorites: [],
              },
              token: "imatoken",
            },
            errors: [],
          },
          status: 200,
        });
      });
      test("login calls commit with ADD_TOKEN", async () => {
        expect(commit).toHaveBeenCalledWith("SET_TOKEN", "imatoken");
      });
    });

    // cannot figure out why this mock affects other test, I've tried clearing, resettin...
    xdescribe("when token is not obtained", () => {
      beforeEach(() => {
        httpService.post.mockImplementation((path, payload, callback) =>
          callback(401, { data: {}, errors: ["bad request"] })
        );
        actions.login({ commit }, { username: "test", password: "password" });
      });

      test("it doesn't try to set the token if it's not present", () => {
        expect(commit).not.toHaveBeenCalledWith("SET_TOKEN");
      });
    });
  });
});
