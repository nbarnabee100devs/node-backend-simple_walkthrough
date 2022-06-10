const express = require("express");
const app = express();
app.use(express.static("public"));

app.listen(5000);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/:page", (request, response) => {
  let pageName = request.params.page;
  response.sendFile(__dirname + `/${pageName}.html`);
});
