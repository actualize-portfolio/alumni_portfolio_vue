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

  describe("setToken", () => {
    it("sets jwt to the passed token", () => {
      mutations.setToken(state, "imatoken");

      expect(state.jwt).toEqual("imatoken");
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
    it("prepends a new api request", () => {
      state.apiVisualizer.apiRequests = [
        {
          id: "123abc",
          url: "GET /books",
          response: {
            body: [],
            status: 200,
          },
        },
      ];

      mutations.addApiRequest(state, {
        url: "GET /github_repos",
        response: {
          data: [],
          status: 200,
        },
      });

      expect(state.apiVisualizer.apiRequests[0].url).toEqual(
        "GET /github_repos"
      );
    });
  });
});
