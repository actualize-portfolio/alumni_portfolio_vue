import HttpService from "@/services/HttpService.js";

const loadBooks = ({ commit }) => {
  commit("START_LOADING");
  return HttpService.get("books", (status, response) => {
    commit("ADD_API_REQUEST", {
      url: "GET /api/v1/books",
      response,
      status,
    });
    commit("SET_BOOKS", response.data);
    commit("STOP_LOADING");
  });
};

const removeFavoriteBook = ({ commit }, book) => {
  HttpService.delete(`/user_books/${book.id}`, (status, response) => {
    commit("ADD_API_REQUEST", {
      url: `DELETE /api/v1/user_books/${book.id}`,
      response,
      status,
    });
    commit("DESTROY_FAVORITE_BOOK", book);
  });
};

const setFavoriteBook = ({ commit }, book) => {
  HttpService.post("/user_books", { book_id: book.id }, (status, response) => {
    commit("ADD_API_REQUEST", {
      url: "POST /api/v1/user_books",
      response,
      status,
    });
    commit("CREATE_FAVORITE_BOOK", book);
  });
};

export default {
  loadBooks,
  removeFavoriteBook,
  setFavoriteBook
}
