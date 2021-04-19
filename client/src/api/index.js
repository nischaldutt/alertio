const axios = require("axios");

const backend = axios.create({
  baseUrl: process.env.REACT_APP_PROXY,
});

export default backend;
