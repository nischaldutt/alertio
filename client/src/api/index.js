const axios = require("axios");

axios.defaults.withCredentials = true;

const backend = axios.create({
  baseUrl: process.env.REACT_APP_PROXY,
});

// Add a response interceptor
backend.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    const jwtError =
      error && error.response.data.message === "JWT_TOKEN_EXPIRED"
        ? true
        : false;

    if (jwtError && !originalRequest._retry) {
      originalRequest._retry = true;

      const {
        data: { accessToken },
      } = await backend.post(
        "/auth/token",
        {
          refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", accessToken);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return backend(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default backend;
