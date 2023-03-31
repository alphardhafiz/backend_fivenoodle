import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const MenuCategory = db.define(
  "menu_categories",
  {
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
// (async () => {
//   await db.sync();
// })();

export default MenuCategory;
