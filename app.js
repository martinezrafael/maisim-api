const express = require("express");
require("dotenv").config();
const top10Controller = require("./controllers/top10Controller");
const geralController = require("./controllers/geralController");

const app = express();

app.use(express.json());

app.use("/top", top10Controller);
app.use("/geral", geralController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
