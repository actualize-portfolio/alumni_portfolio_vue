const initialize = ({ commit }) => {
  commit("stopLoading");
  commit("initialize");
};

const stopLoading = ({ commit }) => {
  commit("stopLoading");
};

const toggleTheApiVisualizer = ({ commit }) => {
  commit("toggleApiVisualizer");
};

const addApiRequest = ({ commit }, apiRequest) => {
  commit("addApiRequest", apiRequest);
};

export default {
  initialize,
  stopLoading,
  toggleTheApiVisualizer,
  addApiRequest,
};
