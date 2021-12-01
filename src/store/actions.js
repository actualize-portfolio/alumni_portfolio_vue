import HttpService from "@/services/HttpService";
import books from "@/store/actions/books"
import repos from "@/store/actions/repos"

const initialize = ({ commit }) => {
  commit("STOP_LOADING");
  commit("INITIALIZE");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("TOGGLE_API_VISUALIZER");
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
  ...books,
  ...repos,
};
