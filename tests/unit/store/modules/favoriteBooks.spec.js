import favoriteBooks from "@/store/modules/favoriteBooks";
import httpService from "@/services/HttpService";
import store from "@/store";

jest.mock("@/services/HttpService.js", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe("favoriteBooks module", () => {
  describe("actions", () => {
    let commit;

    beforeEach(() => (commit = jest.fn()));

    describe("loadBooks", () => {
      beforeEach(() => {
        httpService.get.mockImplementation((_, callback) =>
          callback(200, { data: [{ title: "Go Blue" }] })
        );
        favoriteBooks.actions.loadBooks({ commit });
      });

      test("loadBooks calls commit with startLoading", () => {
        expect(commit).toHaveBeenCalledWith("startLoading");
      });
      test("loadBooks calls commit with setBooks", () => {
        expect(commit).toHaveBeenCalledWith("setBooks", [{ title: "Go Blue" }]);
      });
      test("loadBooks calls commit with stopLoading", () => {
        expect(commit).toHaveBeenCalledWith("stopLoading");
      });
    });

    describe("removeFavoriteBook", () => {
      beforeEach(() => {
        httpService.delete.mockImplementation((_, callback) =>
          callback(200, {
            data: {
              id: 12,
              user_id: 3,
              book_id: 2,
            },
            errors: [],
          })
        );
        favoriteBooks.actions.removeFavoriteBook({ commit }, { id: 1 });
      });

      test("removeFavoriteBook calls commit with destroyFavoriteBook", () => {
        expect(commit).toHaveBeenCalledWith("destroyFavoriteBook", { id: 1 });
      });
    });

    describe("setFavoriteBook", () => {
      beforeEach(() => {
        httpService.post.mockImplementation((_, __, callback) =>
          callback(200, {
            data: {
              id: 15,
              user_id: 3,
              book_id: 1,
            },
            errors: [],
          })
        );
        favoriteBooks.actions.setFavoriteBook({ commit }, { id: 1 });
      });

      test("setFavoriteBook calls commit with createFavoriteBook", () => {
        expect(commit).toHaveBeenCalledWith("createFavoriteBook", { id: 1 });
      });
    });
  });

  describe("mutations", () => {
    const state = store.state;

    describe("setBooks", () => {
      it("sets books to the passed value", () => {
        favoriteBooks.mutations.setBooks(state, [{ id: 1 }]);

        expect(state.books).toEqual([{ id: 1 }]);
      });
    });

    describe("createFavoriteBook", () => {
      it("sets the passed books is_favorite status to true", () => {
        state.books = [
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ];

        favoriteBooks.mutations.createFavoriteBook(state, state.books[0]);

        expect(state.books).toEqual([
          { id: 1, is_favorite: true },
          { id: 2, is_favorite: true },
        ]);
      });

      it("leaves the books alone if books can't be found", () => {
        state.books = [
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ];

        favoriteBooks.mutations.createFavoriteBook(state, { id: 3 });

        expect(state.books).toEqual([
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ]);
      });
    });

    describe("destroyFavoriteBook", () => {
      it("sets the passed books is_favorite status to false", () => {
        state.books = [
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ];

        favoriteBooks.mutations.destroyFavoriteBook(state, state.books[1]);

        expect(state.books).toEqual([
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: false },
        ]);
      });

      it("leaves the books alone if books can't be found", () => {
        state.books = [
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ];

        favoriteBooks.mutations.destroyFavoriteBook(state, { id: 3 });

        expect(state.books).toEqual([
          { id: 1, is_favorite: false },
          { id: 2, is_favorite: true },
        ]);
      });
    });
  });
});
