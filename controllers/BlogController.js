import Blog from "../models/BlogModel.js";
import BlogCategory from "../models/BlogCategoryModel.js";
import path from "path";
import fs from "fs";

export const getBlog = async (req, res) => {
  try {
    const response = await Blog.findAll({
      include: [
        {
          model: BlogCategory,
          attributes: ["Nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const response = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: BlogCategory,
          attributes: ["Nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createBlog = async (req, res) => {
  const blogCategory = await BlogCategory.findOne({
    where: {
      id: parseInt(req.body.Kategori),
    },
  });
  if (!blogCategory)
    return res.status(404).json({ msg: "Data tidak ditemukan" });

  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const Nama = req.body.Nama;
  const Deskripsi = req.body.Deskripsi;
  const file = req.files.img;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/blog/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".jfif", ".webp"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5MB" });

  file.mv(`./public/images/blog/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Blog.create({
        Nama: Nama,
        Deskripsi: Deskripsi,
        img: fileName,
        url: url,
        blogCategoryId: blogCategory.id,
      });
      res.status(201).json({ msg: "Blog Created" });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });
};
export const updateBlog = async (req, res) => {
  const blog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!blog) return res.status(404).json({ msg: "Data tidak ditemukan" });

  let fileName = "";
  if (req.files === null) {
    fileName = blog.img;
  } else {
    const file = req.files.img;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".jfif", ".webp"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5MB" });

    const filepath = `./public/images/blog/${blog.img}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/blog/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const Nama = req.body.Nama;
  const Deskripsi = req.body.Deskripsi;
  const url = `${req.protocol}://${req.get("host")}/images/blog/${fileName}`;
  const blogCategory = await BlogCategory.findOne({
    where: {
      id: parseInt(req.body.Kategori),
    },
  });
  if (!blogCategory)
    return res.status(404).json({ msg: "Data tidak ditemukan" });

  try {
    await Blog.update(
      {
        Nama: Nama,
        Deskripsi: Deskripsi,
        img: fileName,
        url: url,
        blogCategoryId: blogCategory.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Blog Updated" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!blog) return res.status(404).json({ msg: "Data tidak Ditemukan" });

  try {
    const filepath = `./public/images/blog/${blog.img}`;
    fs.unlinkSync(filepath);
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Blog Deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
