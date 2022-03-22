import HttpService from "@/services/HttpService";

const repoTracker = {
  state() {
    return {
      episodes: [],
      topTen: [],
      userTopTen: [],
    };
  },
  mutations: {
    setEpisodes(state, episodes) {
      state.episodes = episodes;
    },
    setTopTenEpisodes(state, episodes) {
      state.topTen = episodes;
    },
    setUserTopTenEpisodes(state, episodes) {
      state.userTopTen = episodes;
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
    getTopTenEpisodes({ commit }) {
      HttpService.get("sunny_episodes").then((response) => {
        commit("setTopTenEpisodes", response.data.top_ten);
        commit("setUserTopTenEpisodes", response.data.top_ten_by_user);
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

export default repoTracker;
