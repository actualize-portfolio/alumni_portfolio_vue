import { notify } from "@kyvg/vue3-notification";
import router from "@/router";
import HttpService from "@/services/HttpService";

const sessions = {
  state() {
    return {};
  },
  mutations: {
    setToken(state, token) {
      state.jwt = token;
    }
  },
  actions: {
    login({ commit }, { username, password, redirectTo = "/" }) {
      commit("startLoading");
      HttpService.post("login", { username, password })
        .then((response) => {
          if (response.data.token) {
            commit("setToken", response.data.token);
            router.push(redirectTo)
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
    },
    logout({ commit }) {
      commit("setToken", undefined);
      router.push({ name: "LandingPage" });
    },
    createUser({ commit }, formData) {
      commit("startLoading");
      HttpService.post("users", formData).then((response) => {
        if (response.data.token) {
          commit("setToken", response.data.token);
          router.push({ name: "LandingPage" })
        }
      });
    }
  },
};

export default sessions;
