const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const routes = require("./routes/index");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
