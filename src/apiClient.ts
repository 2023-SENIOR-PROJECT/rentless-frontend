import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:8000/api/v1/" : "/",
  headers: {},
});

export function setCommonHeader(key: string, value: string) {
  apiClient.defaults.headers.common[key] = value;
}

setCommonHeader("Content-type", "application/json");
// setCommonHeader("Origin", "*");

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo"))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).token
      }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
