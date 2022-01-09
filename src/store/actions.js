import HttpService from "@/services/HttpService";

const initialize = ({ commit }) => {
  commit("stopLoading");
  commit("initialize");
};

const stopLoading = ({ commit }) => {
  commit("stopLoading");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("toggleApiVisualizer");
};

const addApiRequest = ({ commit }, apiRequest) => {
  commit("addApiRequest", apiRequest);
};

const login = ({ commit }, { username, password, redirectTo = "/" }) => {
  commit("startLoading");
  HttpService.post("login", { username, password }).then((response) => {
    if (response.data.token) {
      commit("setToken", response.data.token);
      document.location = redirectTo;
    }
  });
};

const createUser = (
  { commit },
  { username, password, age, redirectTo = "/" }
) => {
  commit("startLoading");
  HttpService.post("users", { user: { username, password, age } }).then(
    (response) => {
      if (response.data.token) {
        commit("setToken", response.data.token);
        document.location = redirectTo;
      }
    }
  );
};

export default {
  initialize,
  stopLoading,
  login,
  createUser,
  toggleTheApiVisualizer,
  addApiRequest,
};
