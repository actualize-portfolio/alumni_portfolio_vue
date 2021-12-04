import store from "@/store/";

describe("store", () => {
  describe("state", () => {
    it("has starting state", () => {
      expect(store.state).toEqual({
        jwt: null,
        storeReady: false,
        loading: false,
        favoriteBooks: {
          books: [],
        },
        repoTracker: {
          repos: [],
          categories: [],
        },
        apiVisualizer: {
          apiRequests: [],
          show: true,
        },
      });
    });
  });
});
