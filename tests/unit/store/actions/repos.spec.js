import actions from "@/store/actions/repos";
import httpService from "@/services/HttpService";

jest.mock("@/services/HttpService.js", () => ({
  get: jest.fn(),
}));

describe("repos actions", () => {
  let commit;

  beforeEach(() => (commit = jest.fn()));

  describe("clearRepos", () => {
    test("initialize calls commit with SET_REPOS", () => {
      actions.clearRepos({ commit });

      expect(commit).toHaveBeenCalledWith("SET_REPOS", []);
    });
  });

  describe("loadRepos", () => {
    const repos = [
      {
        id: 1,
        name: "vue",
        full_name: "vuejs/vue",
        category: "javascript_framework",
        forks_count: 30644,
        stargazers_count: 190269,
        watchers_count: 190269,
        popularity_rating: 177157,
      },
      {
        id: 2,
        name: "react",
        full_name: "facebook/react",
        category: "javascript_framework",
        forks_count: 35903,
        stargazers_count: 177616,
        watchers_count: 177616,
        popularity_rating: 168295,
      },
    ];

    beforeEach(() => {
      httpService.get.mockImplementation((_, callback) =>
        callback(200, { data: repos })
      );
      actions.loadRepos({ commit }, "the burbs");
    });

    test("loadRepos calls commit with START_LOADING", () => {
      expect(commit).toHaveBeenCalledWith("START_LOADING");
    });
    test("loadRepos calls commit with ADD_API_REQUEST", () => {
      expect(commit).toHaveBeenCalledWith("ADD_API_REQUEST", {
        url: "GET /api/v1/github_repos",
        response: { data: repos },
        status: 200,
      });
    });
    test("loadRepos calls commit with SET_CATEGORIES", () => {
      expect(commit).toHaveBeenCalledWith("SET_CATEGORIES", [
        "javascript_framework",
      ]);
    });
    test("loadRepos calls commit with SET_REPOS", () => {
      expect(commit).toHaveBeenCalledWith("SET_REPOS", repos);
    });
    test("loadRepos calls commit with STOP_LOADING", () => {
      expect(commit).toHaveBeenCalledWith("STOP_LOADING");
    });
  });
});
