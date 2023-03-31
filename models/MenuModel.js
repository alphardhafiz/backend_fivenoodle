import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import MenuCategory from "./MenuCategoryModel.js";

const { DataTypes } = Sequelize;

const Menus = db.define(
  "menu",
  {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    nutriScore: DataTypes.INTEGER,
    img: DataTypes.STRING,
    url: DataTypes.STRING,
    menuCategoryId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

MenuCategory.hasMany(Menus);
Menus.belongsTo(MenuCategory, { foreignKey: "menuCategoryId" });

export default Menus;

// (async () => {
//   await db.sync();
// })();
