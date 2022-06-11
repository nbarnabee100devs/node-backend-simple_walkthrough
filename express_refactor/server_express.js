const express = require("express");
const app = express();
app.use(express.static("public"));
const PORT = 5000;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/:page", (request, response) => {
  let pageName = request.params.page;
  response.sendFile(__dirname + `/${pageName}.html`);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
