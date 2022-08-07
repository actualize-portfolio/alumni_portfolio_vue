import { notify } from "@kyvg/vue3-notification";
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
  HttpService.post("login", { username, password })
    .then((response) => {
      if (response.data.token) {
        commit("setToken", response.data.token);
        commit("setUser", response.data.user);
        document.location = redirectTo;
      }
    })
    .catch((error) => {
      notify({
        group: "errors",
        title: error.statusText,
        text: error.data.errors.error,
        type: "warn",
      });
    });
};

const createUser = ({ commit }, formData) => {
  commit("startLoading");
  HttpService.post("users", formData).then((response) => {
    if (response.data.token) {
      commit("setToken", response.data.token);
      document.location = "/";
    }
  });
};

const getUser = ({ commit }, user_id) => {
  commit("startLoading");
  HttpService.get(`users/${user_id}`).then((response) => {
    commit("setUser", response.data.user);
  });
};

const updateUser = ({ commit }, userData) => {
  commit("startLoading");
  HttpService.patch(`users/${userData.id}`, userData).then((response) => {
    commit("setUser", response.data.user);
  });
};

export default {
  initialize,
  stopLoading,
  login,
  createUser,
  getUser,
  updateUser,
  toggleTheApiVisualizer,
  addApiRequest,
};
