require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/yummy.sqlite", // Nombre del archivo de la base de datos SQLite
  logging: false,
});

module.exports = { conn: sequelize };
