import * as Notification from "@kyvg/vue3-notification";

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
      let notifySpy;

      beforeEach(async () => {
        notifySpy = jest.spyOn(Notification, "notify");

        httpService.post.mockImplementation(() =>
          Promise.reject({
            statusText: "Unauthorized",
            data: {
              errors: {
                error: "Invalid username or password",
              },
            },
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

      test("notifies user with a flash message", () => {
        expect(notifySpy).toHaveBeenCalledWith({
          group: "errors",
          text: "Invalid username or password",
          title: "Unauthorized",
          type: "warn",
        });
      });
    });
  });

  describe("getUser", () => {
    const userId = 2;

    beforeEach(async () => {
      httpService.get.mockImplementation(() =>
        Promise.resolve({
          data: {
            user: {
              id: 2,
              username: "demo_user@test.com",
              age: 30,
            },
            token: "imatoken",
          },
          errors: [],
        })
      );

      await actions.getUser({ commit }, userId);
    });

    it("performs user fetch", () => {
      expect(commit).toHaveBeenCalledWith("startLoading");
      expect(commit).toHaveBeenCalledWith("setUser", {
        id: 2,
        username: "demo_user@test.com",
        age: 30,
      });
    });
  });

  describe("createUser", () => {
    let formData;

    beforeEach(() => {
      formData = undefined;
      formData = new FormData();

      formData.append("username", "test");
      formData.append("password", "passwor");
    });

    describe("when user is created", () => {
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

        await actions.createUser({ commit }, formData);
      });

      test("login calls commit with startLoading", () => {
        expect(commit).toHaveBeenCalledWith("startLoading");
      });

      test("login calls commit with setToken", async () => {
        expect(commit).toHaveBeenCalledWith("setToken", "imatoken");
      });
    });

    describe("when user is not created", () => {
      beforeEach(async () => {
        httpService.post.mockImplementation(() =>
          Promise.resolve({
            data: {},
            errors: ["bad request"],
          })
        );

        await actions.createUser({ commit }, formData);
      });

      test("it doesn't try to set the token if it's not present", () => {
        expect(commit).not.toHaveBeenCalledWith("setToken");
      });
    });
  });
});
