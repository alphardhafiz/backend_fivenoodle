import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const BlogCategory = db.define(
  "blog_categories",
  {
    Nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default BlogCategory;

// (async () => {
//   await db.sync();
// })();
