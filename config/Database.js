import { Sequelize } from "sequelize";

const db = new Sequelize("fivenoodle", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
