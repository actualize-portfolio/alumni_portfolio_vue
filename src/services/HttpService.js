import axios from "axios";
import store from "@/store";
import router from "@/router";

axios.defaults.baseURL = process.env.VUE_APP_ALUMNI_PORTFOLIO_API_ENDPOINT;
axios.defaults.timeout = process.env.VUE_APP_AXIOS_TIMEOUT;

class HttpService {
  constructor() {
    let service = axios.create();

    service.interceptors.request.use((request) => {
      const jwt = JSON.parse(localStorage.vuex)["jwt"];

      if (jwt) request.headers.common.Authorization = `Bearer ${jwt}`;

      return request;
    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      service.interceptors.request.use((request) => {
        console.log("Starting Request", JSON.stringify(request, null, 2));
        return request;
      });

      service.interceptors.response.use((response) => {
        console.log("Response:", JSON.stringify(response, null, 2));
        return response;
      });
    }

    this.service = service;
  }

  handleSuccess({ data, request, status }) {
    store.dispatch("stopLoading");
    store.dispatch("addApiRequest", {
      path: request.responseURL,
      data,
      status,
    });
    return data;
  }

  handleError(error) {
    store.dispatch("stopLoading");
    switch (error.response.status) {
      case 401:
        router.push({ name: "LoginPage" });
        break;
      default:
        router.push({ name: "LandingPage" });
        break;
    }
    return Promise.reject(error.response);
  }

  get(path, query = {}) {
    return this.service.get(path, { params: query });
  }

  delete(path) {
    return this.service.delete(path);
  }

  post(path, payload) {
    return this.service.post(path, payload);
  }

  patch(path, payload) {
    return this.service.patch(path, payload);
  }
}

export default new HttpService();
