import actions from "@/store/actions";
import httpService from "@/services/HttpService.js";

jest.mock("@/services/HttpService");

beforeEach(() => jest.clearAllMocks());

describe("actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("initialize", () => {
    test("initialize calls commit with initialize", () => {
      actions.initialize({ commit });

      expect(commit).toHaveBeenCalledWith("initialize");
    });
  });

  describe("toggleTheApiVisualizer", () => {
    test("toggleTheApiVisualizer calls commit with toggleApiVisualizer", () => {
      actions.toggleTheApiVisualizer({ commit });

      expect(commit).toHaveBeenCalledWith("toggleApiVisualizer");
    });
  });

  describe("login", () => {
    describe("when token obtained", () => {
      beforeEach(async () => {
        httpService.post.mockImplementation(() =>
          Promise.resolve({
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

        await actions.login(
          { commit },
          { username: "test", password: "password" }
        );
      });

      test("login calls commit with startLoading", () => {
        expect(commit).toHaveBeenCalledWith("startLoading");
      });

      test("login calls commit with setToken", async () => {
        expect(commit).toHaveBeenCalledWith("setToken", "imatoken");
      });
    });

    describe("when token is not obtained", () => {
      beforeEach(async () => {
        httpService.post.mockImplementation(() =>
          Promise.resolve({
            data: {},
            errors: ["bad request"],
          })
        );

        await actions.login(
          { commit },
          { username: "test", password: "password" }
        );
      });

      test("it doesn't try to set the token if it's not present", () => {
        expect(commit).not.toHaveBeenCalledWith("setToken");
      });
    });
  });
});
