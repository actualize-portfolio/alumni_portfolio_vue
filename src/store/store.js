import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import actions from "./actions";
import mutations from "./mutations";

const store = createStore({
  state: {
    jwt: null,
    storeReady: false,
    loading: false,
    favoriteBooks: {
      books: [],
    },
    repoTracker: {
      repos: [],
      categories: [],
    },
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
