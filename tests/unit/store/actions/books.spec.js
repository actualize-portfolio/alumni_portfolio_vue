import books from "@/store/actions/books";
import httpService from "@/services/HttpService.js";

jest.mock("@/services/HttpService.js", () => ({ get: jest.fn() }));

describe("actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("loadBooks", () => {
    beforeEach(() => {
      httpService.get.mockImplementation((_, callback) =>
        callback(200, { data: [{ title: "Go Blue" }] })
      );
      books.loadBooks({ commit });
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
});
