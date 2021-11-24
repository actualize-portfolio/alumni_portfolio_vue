import mutations from "@/store/mutations";
import store from "@/store/store";

describe("mutations", () => {
  const state = store.state;

  describe("INITIALIZE", () => {
    it("sets storeReady to true", () => {
      mutations.INITIALIZE(state);

      expect(state.storeReady).toBe(true);
    });
  });

  describe("SET_TOKEN", () => {
    it("sets jwt to the passed token", () => {
      mutations.SET_TOKEN(state, "imatoken");

      expect(state.jwt).toEqual("imatoken");
    });
  });

  describe("SET_BOOKS", () => {
    it("sets books to the passed value", () => {
      mutations.SET_BOOKS(state, [{ id: 1 }]);

      expect(state.favoriteBooks.books).toEqual([{ id: 1 }]);
    });
  });

  describe("SET_REPOS", () => {
    it("sets repos to the passed value", () => {
      mutations.SET_REPOS(state, [{ id: 1 }]);

      expect(state.repoTracker.repos).toEqual([{ id: 1 }]);
    });
  });

  describe("SET_CATEGORIES", () => {
    it("sets categories to the passed value", () => {
      mutations.SET_CATEGORIES(state, ["javascript_framework"]);

      expect(state.repoTracker.categories).toEqual(["javascript_framework"]);
    });
  });

  describe("CREATE_FAVORITE_BOOK", () => {
    it("sets the passed books is_favorite status to true", () => {
      state.favoriteBooks.books = [
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ];

      mutations.CREATE_FAVORITE_BOOK(state, state.favoriteBooks.books[0]);

      expect(state.favoriteBooks.books).toEqual([
        { id: 1, is_favorite: true },
        { id: 2, is_favorite: true },
      ]);
    });

    it("leaves the books alone if books can't be found", () => {
      state.favoriteBooks.books = [
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ];

      mutations.CREATE_FAVORITE_BOOK(state, { id: 3 });

      expect(state.favoriteBooks.books).toEqual([
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ]);
    });
  });

  describe("DESTROY_FAVORITE_BOOK", () => {
    it("sets the passed books is_favorite status to false", () => {
      state.favoriteBooks.books = [
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ];

      mutations.DESTROY_FAVORITE_BOOK(state, state.favoriteBooks.books[1]);

      expect(state.favoriteBooks.books).toEqual([
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: false },
      ]);
    });

    it("leaves the books alone if books can't be found", () => {
      state.favoriteBooks.books = [
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ];

      mutations.DESTROY_FAVORITE_BOOK(state, { id: 3 });

      expect(state.favoriteBooks.books).toEqual([
        { id: 1, is_favorite: false },
        { id: 2, is_favorite: true },
      ]);
    });
  });

  describe("START_LOADING", () => {
    it("sets loading to true", () => {
      state.loading = false;

      mutations.START_LOADING(state);

      expect(state.loading).toBe(true);
    });
  });

  describe("STOP_LOADING", () => {
    it("sets loading to false", () => {
      state.loading = true;

      mutations.STOP_LOADING(state);

      expect(state.loading).toBe(false);
    });
  });

  describe("TOGGLE_API_VISUALIZER", () => {
    it("toggles the api visualizer show boolean", () => {
      state.apiVisualizer.show = false;

      mutations.TOGGLE_API_VISUALIZER(state);

      expect(state.apiVisualizer.show).toBe(true);
    });

    it("clears the apiRequests when flipping to false", () => {
      state.apiVisualizer.show = true;

      mutations.TOGGLE_API_VISUALIZER(state);

      expect(state.apiVisualizer.show).toBe(false);
      expect(state.apiVisualizer.apiRequests).toEqual([]);
    });
  });

  describe("ADD_API_REQUEST", () => {
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

      mutations.ADD_API_REQUEST(state, {
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
