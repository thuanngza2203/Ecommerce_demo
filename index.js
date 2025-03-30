import { AppRoute } from "./AppRoute";
const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
AppRoute(app);

//http://localhost:3000
app.get("/", (req, res) => {
  res.send("Hello World Thuddan");
});
app.get("/api", (req, res) => {
  res.send("Hello World Thuddan API");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
