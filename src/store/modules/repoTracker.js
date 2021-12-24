import HttpService from "@/services/HttpService";

const repoTracker = {
  state() {
    return {
      repos: [],
      categories: [],
    };
  },
  mutations: {
    setRepos(state, repos) {
      state.repos = repos;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    clearRepos({ commit }) {
      commit("setRepos", []);
    },
    loadRepos({ commit }) {
      commit("startLoading");
      HttpService.get("github_repos")
        .then((response) => {
          const data = response.data;
          commit("setRepos", data);
          commit("setCategories", [
            ...new Set(
              data.map((repo) => {
                return repo.category;
              })
            ),
          ]);
        })
        .finally(() => {
          commit("stopLoading");
        });
    },
  },
};

export default repoTracker;
