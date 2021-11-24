import axios from "axios";

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

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    console.log(error);
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/login");
        break;
      case 404:
        this.redirectTo(document, "/");
        break;
      default:
        this.redirectTo(document, "/");
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, callback) {
    return this.service.get(path).then((response) => {
      return callback(response.status, response.data);
    });
  }

  delete(path, callback) {
    return this.service.delete(path).then((response) => {
      return callback(response.status, response.data);
    });
  }

  post(path, payload, callback) {
    return this.service.post(path, payload).then((response) => {
      return callback(response.status, response.data);
    });
  }
}

export default new HttpService();
