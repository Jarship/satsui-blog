const express = require("express");
const next = require("next");
const renderAndCache = require("./render-and-cache");

const dev = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "offline";
const offline = process.env.NODE_ENV === "offline";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

if (dev) {
  app
    .prepare()
    .then(() => {
      const port = process.env.PORT || 3000;

      server.all("*", (req, res) => handle(req, res));

      server.listen(port, err => {
        if (err) throw err;
        console.log(`Listening on port ${port}.`);
      });
    })
    .catch(error => {
      console.log("An error occured, unable to start the server.");
      console.log(error);
    });
} else {
  const path = require("path");
  server.use("/_next", express.static(path.join(__dirname, ".next")));

  if (offline) {
    server.all("*", (req, res) => handle(req, res));
  } else {
    server.get("*", (req, res) => renderAndCache(app, req, res));
  }
 
}
module.exports = server;