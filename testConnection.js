const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shopapp", "root", "12345", {
  host: "127.0.0.1",
  port: 3309,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Kết nối thành công!"))
  .catch((err) => console.error("Lỗi kết nối:", err));
