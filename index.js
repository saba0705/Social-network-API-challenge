const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv");
const db = require("./config/connection");
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);
db.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  }
  );
}
);
