import { AppRoute } from "./AppRoute";
const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_DATABASE_DEV || "shopapp",
  process.env.DB_USERNAME_DEV || "root",
  process.env.DB_PASSWORD_DEV || "12345",
  {
    host: process.env.DB_HOST_DEV || "127.0.0.1",
    port: parseInt(process.env.DB_PORT_DEV || "3309"),
    dialect: process.env.DB_DIALECT_DEV || "mysql",
    logging: false,
  }
);

AppRoute(app);

// Test kết nối database
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to database successfully!");
  })
  .catch((err) => {
    console.error("❌ Failed connection:", err);
  });

// http://localhost:3000
app.get("/", (req, res) => {
  res.send("Hello World Thuddan");
});
app.get("/api", (req, res) => {
  res.send("Hello World Thuddan API");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Example app listening on port ${process.env.PORT || 3000}`);
});
