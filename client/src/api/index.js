const axios = require("axios");

axios.defaults.withCredentials = true;

const backend = axios.create({
  baseUrl: process.env.REACT_APP_PROXY,
});

export default backend;
