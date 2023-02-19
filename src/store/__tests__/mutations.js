import mutations from "@/store/mutations";
import store from "@/store";

describe("mutations", () => {
  const state = store.state;

  describe("initialize", () => {
    it("sets storeReady to true", () => {
      mutations.initialize(state);

      expect(state.storeReady).toBe(true);
    });
  });

  describe("startLoading", () => {
    it("sets loading to true", () => {
      state.loading = false;

      mutations.startLoading(state);

      expect(state.loading).toBe(true);
    });
  });

  describe("stopLoading", () => {
    it("sets loading to false", () => {
      state.loading = true;

      mutations.stopLoading(state);

      expect(state.loading).toBe(false);
    });
  });

  describe("toggleApiVisualizer", () => {
    it("toggles the api visualizer show boolean", () => {
      state.apiVisualizer.show = false;

      mutations.toggleApiVisualizer(state);

      expect(state.apiVisualizer.show).toBe(true);
    });

    it("clears the apiRequests when flipping to false", () => {
      state.apiVisualizer.show = true;

      mutations.toggleApiVisualizer(state);

      expect(state.apiVisualizer.show).toBe(false);
      expect(state.apiVisualizer.apiRequests).toEqual([]);
    });
  });

  describe("addApiRequest", () => {
    it("prepends a new api request with filtered params", () => {
      state.apiVisualizer.apiRequests = [
        {
          id: "123abc",
          path: "books",
          response: {
            body: [],
            status: 200,
          },
        },
      ];

      mutations.addApiRequest(state, {
        path: "github_repos",
        payload: {
          username: "gatorjuice",
          password: "p@ssw@rd",
        },
        response: {
          data: [],
          status: 200,
        },
      });

      const newApiRequest = state.apiVisualizer.apiRequests[0];

      expect(newApiRequest.path).toEqual("github_repos");
      expect(newApiRequest.payload.password).toEqual("[REDACTED]");
    });
  });
});
