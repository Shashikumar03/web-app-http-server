const http = require("http");
const url = require("url");
const fs = require("fs");
const { uid, objData } = require(".");
const PORT = 9000;
const LOCALHOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  let code, pathSegments;
  if (path.includes("delay") || path.includes("status")) {
    pathSegments = parsedUrl.pathname.split("/");
    code = parseInt(pathSegments[2]);
    
  }

  switch (path) {
    case "/html":
      fs.readFile("http-server/index.html", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;
    case "/json":
      json = JSON.stringify(objData);
      res.end(json);
      break;
    case "/uuid":
      json = JSON.stringify(uid);
      res.end(json);
      break;
    case `/status/${code}`:
      if (code >= 100 && code <= 599) {
        res.writeHead(code, { "Content-Type": "text/plain" });
        res.end(`status code- ${code}`);
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("invalid code");
      }
      break;
    case `/delay/${code}`:
      if (code >= 1) {
        setTimeout(() => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(`a delay of ${code} sec`);
        }, code * 1000);
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("invalid time");
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page Not Found");
  }
});

server.listen(PORT, LOCALHOST, () => {
  console.log("listenning to port 9000");
});
