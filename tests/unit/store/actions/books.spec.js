import actions from "@/store/actions/books";
import httpService from "@/services/HttpService";

jest.mock("@/services/HttpService.js", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe("books actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("loadBooks", () => {
    beforeEach(() => {
      httpService.get.mockImplementation((_, callback) =>
        callback(200, { data: [{ title: "Go Blue" }] })
      );
      actions.loadBooks({ commit });
    });

    test("loadBooks calls commit with START_LOADING", () => {
      expect(commit).toHaveBeenCalledWith("START_LOADING");
    });
    test("loadBooks calls commit with ADD_API_REQUEST", () => {
      expect(commit).toHaveBeenCalledWith("ADD_API_REQUEST", {
        url: "GET /api/v1/books",
        response: { data: [{ title: "Go Blue" }] },
        status: 200,
      });
    });
    test("loadBooks calls commit with SET_BOOKS", () => {
      expect(commit).toHaveBeenCalledWith("SET_BOOKS", [{ title: "Go Blue" }]);
    });
    test("loadBooks calls commit with STOP_LOADING", () => {
      expect(commit).toHaveBeenCalledWith("STOP_LOADING");
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
      actions.removeFavoriteBook({ commit }, { id: 1 });
    });

    test("removeFavoriteBook calls commit with ADD_API_REQUEST", () => {
      expect(commit).toHaveBeenCalledWith("ADD_API_REQUEST", {
        url: "DELETE /api/v1/user_books/1",
        response: {
          data: {
            book_id: 2,
            id: 12,
            user_id: 3,
          },
          errors: [],
        },
        status: 200,
      });
    });
    test("removeFavoriteBook calls commit with DESTROY_FAVORITE_BOOK", () => {
      expect(commit).toHaveBeenCalledWith("DESTROY_FAVORITE_BOOK", { id: 1 });
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
      actions.setFavoriteBook({ commit }, { id: 1 });
    });

    test("setFavoriteBook calls commit with ADD_API_REQUEST", () => {
      expect(commit).toHaveBeenCalledWith("ADD_API_REQUEST", {
        url: "POST /api/v1/user_books",
        response: {
          data: {
            book_id: 1,
            id: 15,
            user_id: 3
          },
          errors: [],
        },
        status: 200,
      });
    });
    test("setFavoriteBook calls commit with CREATE_FAVORITE_BOOK", () => {
      expect(commit).toHaveBeenCalledWith("CREATE_FAVORITE_BOOK", { id: 1 });
    });
  });
});
