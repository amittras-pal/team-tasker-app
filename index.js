const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("colors");

const PORT = process.env.PORT;
const dbConnection = require("./config/database.config");
dbConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`.black.bgCyan);
});
