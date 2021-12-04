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
      return HttpService.get(`github_repos`, (status, response) => {
        commit("addApiRequest", {
          url: "GET /api/v1/github_repos",
          response,
          status,
        });
        commit("setRepos", response.data);
        commit("setCategories", [
          ...new Set(
            response.data.map((repo) => {
              return repo.category;
            })
          ),
        ]);
        commit("stopLoading");
      });
    },
  },
};

export default repoTracker;
