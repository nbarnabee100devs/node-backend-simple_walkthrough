const http = require('http');
const fs = require('fs')
const path = require("path");
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, "http://localhost:8000/)");
  const page = myURL.pathname;
  const params = myURL.searchParams;
  const extension = path.extname(req.url);
  const fileName = req.url.slice(1) || "index";
  let filePath = fileName;
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    default:
      filePath = `${fileName}.html`;
      contentType = "text/html";
  };
  if (page == '/api') {
      if(params.get("student") == 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }
      else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  else {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        figlet("404!", function(err, data) {
          res.end(data);
        })
        return;
    }
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    })
  }
});

server.listen(8000);