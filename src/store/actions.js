import HttpService from "@/services/HttpService";

const initialize = ({ commit }) => {
  commit("stopLoading");
  commit("initialize");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("toggleApiVisualizer");
};

const addApiRequest = ({ commit }, apiRequest) => {
  commit("addApiRequest", apiRequest);
};

const login = ({ commit }, { username, password, redirectTo = "/" }) => {
  commit("startLoading");
  HttpService.post(`login`, { username, password }, (status, response) => {
    commit("stopLoading");

    if (response.data.token) {
      commit("setToken", response.data.token);
      document.location = redirectTo;
    }
  });
};

export default {
  initialize,
  login,
  toggleTheApiVisualizer,
  addApiRequest,
};
