import HttpService from "@/services/HttpService.js";

const initialize = ({ commit }) => {
  commit("STOP_LOADING");
  commit("INITIALIZE");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("TOGGLE_API_VISUALIZER");
};

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

const clearRepos = ({ commit }) => {
  commit("SET_REPOS", []);
};

const loadRepos = ({ commit }) => {
  commit("START_LOADING");
  return HttpService.get(`github_repos`, (status, response) => {
    commit("ADD_API_REQUEST", {
      url: "GET /api/v1/github_repos",
      response,
      status,
    });
    commit("SET_REPOS", response.data);
    commit("SET_CATEGORIES", [
      ...new Set(
        response.data.map((repo) => {
          return repo.category;
        })
      ),
    ]);
    commit("STOP_LOADING");
  });
};

const login = ({ commit }, { username, password, redirectTo = "/" }) => {
  commit("START_LOADING");
  HttpService.post(`login`, { username, password }, (status, response) => {
    commit("STOP_LOADING");
    commit("ADD_API_REQUEST", {
      url: "POST /api/v1/login",
      response,
      status,
    });

    if (response.data.token) {
      commit("SET_TOKEN", response.data.token);
      document.location = redirectTo;
    }
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
  clearRepos,
  initialize,
  loadBooks,
  loadRepos,
  login,
  removeFavoriteBook,
  setFavoriteBook,
  toggleTheApiVisualizer,
};
