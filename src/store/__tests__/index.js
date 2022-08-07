import store from "@/store";

describe("store", () => {
  describe("state", () => {
    it("has starting state", () => {
      expect(store.state).toEqual({
        jwt: null,
        storeReady: false,
        loading: false,
        sunnySorter: {
          episodes: [],
          topTen: [],
          userTopTen: [],
        },
        favoriteBooks: {
          books: [],
        },
        repoTracker: {
          repos: [],
          categories: [],
        },
        user: {},
        apiVisualizer: {
          apiRequests: [],
          show: true,
        },
      });
    });
  });
});
