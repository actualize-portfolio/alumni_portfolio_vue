import Vuex from "vuex";
import favoriteBooks from "@/store/modules/favoriteBooks";
import repoTracker from "@/store/modules/repoTracker";
import sunnySorter from "@/store/modules/sunnySorter";
import actions from "./actions";
import mutations from "./mutations";

const store = new Vuex.Store({
  modules: {
    favoriteBooks,
    repoTracker,
    sunnySorter,
  },
  state: {
    jwt: null,
    storeReady: false,
    loading: false,
    apiVisualizer: {
      show: true,
      apiRequests: [],
    },
  },
  actions,
  mutations,
});

export default store;
