import store from "@/store";

describe("store", () => {
  describe("state", () => {
    it("has starting state", () => {
      expect(store.state).toEqual({
        storeReady: false,
        loading: false,
        sessions: {},
        sunnySorter: {
          episodes: [],
          topHundred: [],
          userTopHundred: [],
          rankedSeasons: {},
          userRankedSeasons: {}
        },
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
