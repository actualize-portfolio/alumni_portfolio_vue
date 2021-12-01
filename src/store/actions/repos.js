import HttpService from "@/services/HttpService.js";

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

export default {
  clearRepos,
  loadRepos,
}
