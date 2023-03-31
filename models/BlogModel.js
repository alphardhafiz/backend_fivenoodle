import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import BlogCategory from "./BlogCategoryModel.js";

const { DataTypes } = Sequelize;

const Blog = db.define(
  "blogs",
  {
    Nama: DataTypes.STRING,
    Deskripsi: DataTypes.STRING,
    img: DataTypes.STRING,
    url: DataTypes.STRING,
    blogCategoryId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

BlogCategory.hasMany(Blog);
Blog.belongsTo(BlogCategory, { foreignKey: "blogCategoryId" });

export default Blog;

// (async () => {
//   await db.sync();
// })();
