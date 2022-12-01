import { notify } from "@kyvg/vue3-notification";
import HttpService from "@/services/HttpService";
import router from "@/router";

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

const logout = ({ commit }) => {
  commit("setToken", "");
  router.push({ name: "LandingPage" });
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

export default {
  initialize,
  stopLoading,
  login,
  logout,
  createUser,
  toggleTheApiVisualizer,
  addApiRequest,
};
