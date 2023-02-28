import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import favoriteBooks from "@/store/modules/favoriteBooks";
import repoTracker from "@/store/modules/repoTracker";
import sunnySorter from "@/store/modules/sunnySorter";
import sessions from "@/store/modules/sessions";
import actions from "./actions";
import mutations from "./mutations";

const vueLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: (state) => ({
    sessions: {
      jwt: state.sessions.jwt,
    }
  })
})

const store = new Vuex.Store({
  modules: {
    favoriteBooks,
    repoTracker,
    sunnySorter,
    sessions
  },
  state: {
    storeReady: false,
    loading: false,
    apiVisualizer: {
      show: true,
      apiRequests: [],
    },
  },
  actions,
  mutations,
  plugins: [vueLocalStorage.plugin],
});

export default store;
