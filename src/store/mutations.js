import { v4 as uuidv4 } from "uuid";

const initialize = (state) => {
  state.storeReady = true;
};

const setToken = (state, token) => {
  state.jwt = token;
};

const startLoading = (state) => {
  state.loading = true;
};

const stopLoading = (state) => {
  state.loading = false;
};

const toggleApiVisualizer = (state) => {
  if (state.apiVisualizer.show) {
    state.apiVisualizer.apiRequests = [];
  }
  state.apiVisualizer.show = !state.apiVisualizer.show;
};

const addApiRequest = (state, request) => {
  state.apiVisualizer.apiRequests = [
    {
      id: uuidv4(),
      url: request.url,
      status: request.status,
      response: request.response,
    },
    ...state.apiVisualizer.apiRequests,
  ];
};

export default {
  initialize,
  setToken,
  startLoading,
  stopLoading,
  toggleApiVisualizer,
  addApiRequest,
};
