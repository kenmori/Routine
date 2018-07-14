const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/echo", (req, res) => {
  console.log(req, res);
  res.jsonp(req.query);
});

server.use(router);

server.listen("3000", (req, res, next) => {
  console.log("listen 3000", req);
  console.log("JSON Server is running fafa");
});
