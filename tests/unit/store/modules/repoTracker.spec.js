import repoTracker from "@/store/modules/repoTracker";
import httpService from "@/services/HttpService";
import store from "@/store/";

jest.mock("@/services/HttpService.js", () => ({
  get: jest.fn(),
}));

describe("repoTracker module", () => {
  describe("repoTracker", () => {
    let commit;

    beforeEach(() => (commit = jest.fn()));

    describe("clearRepos", () => {
      test("initialize calls commit with setRepos", () => {
        repoTracker.actions.clearRepos({ commit });

        expect(commit).toHaveBeenCalledWith("setRepos", []);
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
        repoTracker.actions.loadRepos({ commit }, "the burbs");
      });

      test("loadRepos calls commit with startLoading", () => {
        expect(commit).toHaveBeenCalledWith("startLoading");
      });
      test("loadRepos calls commit with addApiRequest", () => {
        expect(commit).toHaveBeenCalledWith("addApiRequest", {
          url: "GET /api/v1/github_repos",
          response: { data: repos },
          status: 200,
        });
      });
      test("loadRepos calls commit with setCategories", () => {
        expect(commit).toHaveBeenCalledWith("setCategories", [
          "javascript_framework",
        ]);
      });
      test("loadRepos calls commit with setRepos", () => {
        expect(commit).toHaveBeenCalledWith("setRepos", repos);
      });
      test("loadRepos calls commit with stopLoading", () => {
        expect(commit).toHaveBeenCalledWith("stopLoading");
      });
    });
  })

  describe("mutations", () => {
    const state = store.state;

    describe("setCategories", () => {
      it("sets categories to the passed value", () => {
        repoTracker.mutations.setCategories(state, ["javascript_framework"]);

        expect(state.categories).toEqual(["javascript_framework"]);
      });
    });

    describe("setRepos", () => {
      it("sets repos to the passed value", () => {
        repoTracker.mutations.setRepos(state, [{ id: 1 }]);

        expect(state.repos).toEqual([{ id: 1 }]);
      });
    });
  });
});
