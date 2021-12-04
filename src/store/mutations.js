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

const addApiRequest = (state, { path, payload, response }) => {
  state.apiVisualizer.apiRequests = [
    {
      id: uuidv4(),
      path,
      status: response.status,
      payload: filterSensitiveKeys(payload),
      response: filterSensitiveKeys(response),
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
  startLoading,
  stopLoading,
  toggleApiVisualizer,
  addApiRequest,
};
