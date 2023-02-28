import HttpService from "@/services/HttpService";

const sunnySorter = {
  state() {
    return {
      episodes: [],
      topHundred: [],
      userTopHundred: [],
      rankedSeasons: {},
      userRankedSeasons: {}
    };
  },
  mutations: {
    setEpisodes(state, episodes) {
      state.episodes = episodes;
    },
    setTopHundredEpisodes(state, episodes) {
      state.topHundred = episodes;
    },
    setUserTopHundredEpisodes(state, episodes) {
      state.userTopHundred = episodes;
    },
    setRankedSeasons(state, seasons) {
      state.rankedSeasons = seasons;
    },
    setUserRankedSeasons(state, seasons) {
      state.userRankedSeasons = seasons;
    },
  },
  actions: {
    clearEpisodes({ commit }) {
      commit("setEpisodes", []);
    },
    getSunnyEpisodes({ commit }) {
      HttpService.get("sunny_episode_user_rankings").then((response) => {
        commit("setEpisodes", response.data);
      });
    },
    getTopHundredEpisodes({ commit }) {
      HttpService.get("sunny_episodes").then((response) => {
        commit("setTopHundredEpisodes", response.data.top_hundred);
        commit("setUserTopHundredEpisodes", response.data.top_hundred_by_user);
        commit("setRankedSeasons", response.data.ranked_seasons);
        commit("setUserRankedSeasons", response.data.ranked_seasons_by_user);
      });
    },
    vote({ commit }, { better_id, worse_id }) {
      HttpService.post("sunny_episode_user_rankings", {
        better_id,
        worse_id,
      }).then((response) => {
        commit("setEpisodes", response.data);
      });
    },
  },
};

export default sunnySorter;
