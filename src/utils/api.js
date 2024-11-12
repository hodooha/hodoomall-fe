import axios from "axios";
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

let isRefreshing = false;
let refreshSubscribers = [];

const api = axios.create({
  baseURL: `${LOCAL_BACKEND}`,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const refresh = () => {
  return api.get("/auth/refresh");
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((s) => s(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await refresh();
          const { token } = response.data;
          localStorage.setItem("token", token);
          api.defaults.headers.authorization = `Bearer ${token}`;
          originalRequest.headers.authorization = `Bearer ${token}`;
          onRefreshed(token);
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token) => {
          originalRequest.headers.authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    console.log("RESPONSE ERROR", error.response.data);
    return Promise.reject(error.response.data);
  }
);

export default api;
