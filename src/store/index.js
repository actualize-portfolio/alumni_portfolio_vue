import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import favoriteBooks from "@/store/modules/favoriteBooks"
import repoTracker from "@/store/modules/repoTracker"
import actions from "./actions";
import mutations from "./mutations";

const store = new Vuex.Store({
  modules: {
    favoriteBooks,
    repoTracker
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
  plugins: [new VuexPersistence().plugin],
});

export default store;
