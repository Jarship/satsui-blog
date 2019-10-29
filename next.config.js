require('dotenv').config();
const localConfig = require("./secrets.json");
const withCSS = require('@zeit/next-css');

const dev = process.env.NODE_ENV !== "production";

const ROOT_URI = 
  !!dev
  ? `http://localhost${process.env.END_POINT || "3000"}`
  : process.env.ROOT_URI || localConfig.ROOT_URI;

module.exports = withCSS({
  publicRuntimeConfig: {
    ROOT_URI: ROOT_URI
  }
})
;