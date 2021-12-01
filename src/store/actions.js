import HttpService from "@/services/HttpService";
import books from "@/store/actions/books"

const initialize = ({ commit }) => {
  commit("STOP_LOADING");
  commit("INITIALIZE");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("TOGGLE_API_VISUALIZER");
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

export default {
  initialize,
  login,
  toggleTheApiVisualizer,
  clearRepos,
  loadRepos,
  ...books,
};
