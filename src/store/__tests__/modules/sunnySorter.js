import sunnySorter from "@/store/modules/sunnySorter";
import httpService from "@/services/HttpService";
import store from "@/store";

jest.mock("@/services/HttpService");

beforeEach(() => jest.clearAllMocks());

describe("sunnySorter module", () => {
  describe("sunnySorter", () => {
    let commit;

    beforeEach(() => (commit = jest.fn()));

    describe("clearEpisodes", () => {
      test("initialize calls commit with setEpisodes", () => {
        sunnySorter.actions.clearEpisodes({ commit });

        expect(commit).toHaveBeenCalledWith("setEpisodes", []);
      });
    });

    describe("vote", () => {
      const episodes = [{ id: 1 }, { id: 2 }];

      beforeEach(async () => {
        httpService.post.mockImplementation(() =>
          Promise.resolve({
            data: episodes,
          })
        );
        await sunnySorter.actions.vote(
          { commit },
          { better_id: 1, worse_id: 2 }
        );
      });

      test("vote response sets updated episodes", () => {
        expect(commit).toHaveBeenCalledWith("setEpisodes", episodes);
      });
    });

    describe("episode setters", () => {
      let episodes;

      beforeEach(async () => {
        httpService.get.mockImplementation(() =>
          Promise.resolve({
            data: episodes,
          })
        );
      });

      describe("getSunnyEpisodes", () => {
        beforeEach(async () => {
          episodes = [{ id: 1 }, { id: 2 }];
          await sunnySorter.actions.getSunnyEpisodes({ commit });
        });

        test("getSunnyEpisodes calls commit with setEpisodes", () => {
          expect(commit).toHaveBeenCalledWith("setEpisodes", episodes);
        });
      });

      describe("setTopHundredEpisodes", () => {
        beforeEach(async () => {
          episodes = {
            top_hundred: [{ id: 1 }, { id: 2 }],
            top_hundred_by_user: [{ id: 1 }, { id: 2 }],
          };
          await sunnySorter.actions.getTopHundredEpisodes({ commit });
        });

        test("setTopHundredEpisodes calls commit with setEpisodes", () => {
          expect(commit).toHaveBeenCalledWith(
            "setTopHundredEpisodes",
            episodes.top_hundred
          );
          expect(commit).toHaveBeenCalledWith(
            "setUserTopHundredEpisodes",
            episodes.top_hundred_by_user
          );
        });
      });
    });
  });

  describe("mutations", () => {
    const state = store.state;

    describe("setEpisodes", () => {
      it("sets repos to the passed value", () => {
        sunnySorter.mutations.setEpisodes(state, [{ id: 1 }]);

        expect(state.episodes).toEqual([{ id: 1 }]);
      });
    });

    describe("setTopHundredEpisodes", () => {
      it("sets top ten episodes to the passed value", () => {
        sunnySorter.mutations.setTopHundredEpisodes(state, []);

        expect(state.topHundred).toEqual([]);
      });
    });

    describe("setUserTopHundredEpisodes", () => {
      it("sets user top ten episodes to the passed value", () => {
        sunnySorter.mutations.setUserTopHundredEpisodes(state, []);

        expect(state.userTopHundred).toEqual([]);
      });
    });
  });
});
