import serviceWeb from "@/store/modules/serviceWeb";
import httpService from "@/services/HttpService";
import store from "@/store";

jest.mock("@/services/HttpService");

beforeEach(() => jest.clearAllMocks());

describe("serviceWeb module", () => {
  describe("serviceWeb", () => {
    let commit;

    beforeEach(() => (commit = jest.fn()));

    describe("loadServiceWebResources", () => {
      const resources = [];

      beforeEach(async () => {
        httpService.get.mockImplementation(() =>
          Promise.resolve({
            data: resources,
          })
        );

        await serviceWeb.actions.loadServiceWebResources({ commit });
      });

      test("loadServiceWebResources calls commit with startLoading", () => {
        expect(commit).toHaveBeenCalledWith("startLoading");
      });

      test("loadServiceWebResources calls commit with setServiceWebResources", () => {
        expect(commit).toHaveBeenCalledWith("setServiceWebResources", [
          "javascript_framework",
        ]);
      });

      test("loadServiceWebResources calls commit with setRepos", () => {
        expect(commit).toHaveBeenCalledWith("setRepos", resources);
      });
    });
  });

  describe("mutations", () => {
    const state = store.state;

    describe("setServiceWebResources", () => {
      it("sets categories to the passed value", () => {
        serviceWeb.mutations.setServiceWebResources(state, [
          "javascript_framework",
        ]);

        expect(state.categories).toEqual(["javascript_framework"]);
      });
    });

    describe("setRepos", () => {
      it("sets repos to the passed value", () => {
        serviceWeb.mutations.setRepos(state, [{ id: 1 }]);

        expect(state.repos).toEqual([{ id: 1 }]);
      });
    });
  });
});
