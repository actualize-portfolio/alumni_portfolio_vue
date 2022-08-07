import { v4 as uuidv4 } from "uuid";

const initialize = (state) => {
  state.storeReady = true;
};

const setToken = (state, token) => {
  state.jwt = token;
};

const setUser = (state, user) => {
  state.user = user;
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

const addApiRequest = (state, { path, payload, data, status }) => {
  state.apiVisualizer.apiRequests = [
    {
      id: uuidv4(),
      path,
      status,
      payload: filterSensitiveKeys(payload),
      response: filterSensitiveKeys(data),
    },
    ...state.apiVisualizer.apiRequests,
  ];
};

function filterSensitiveKeys(object = {}) {
  const sensitiveKeys = ["password"];

  return Object.keys(object).reduce(
    (attrs, key) => ({
      ...attrs,
      [key]: sensitiveKeys.includes(key) ? "[REDACTED]" : object[key],
    }),
    {}
  );
}

export default {
  initialize,
  setToken,
  setUser,
  startLoading,
  stopLoading,
  toggleApiVisualizer,
  addApiRequest,
};
