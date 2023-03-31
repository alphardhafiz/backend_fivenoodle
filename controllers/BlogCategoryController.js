import BlogCategory from "../models/BlogCategoryModel.js";

export const getBlogCategory = async (req, res) => {
  try {
    const response = await BlogCategory.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getBlogCategoryById = async (req, res) => {
  try {
    const response = await BlogCategory.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createBlogCategory = async (req, res) => {
  const { Nama } = req.body;
  try {
    await BlogCategory.create({
      Nama: Nama,
    });
    res.status(201).json({ msg: "Blog Category Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateBlogCategory = async (req, res) => {
  const blogCategory = await BlogCategory.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!blogCategory)
    return res.status(404).json({ msg: "Blog Category tidak ditemukan" });
  const { Nama } = req.body;
  try {
    await BlogCategory.update(
      {
        Nama: Nama,
      },
      {
        where: {
          id: blogCategory.id,
        },
      }
    );
    res.status(200).json({ msg: "Blog Category Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteBlogCategory = async (req, res) => {
  const blogCategory = await BlogCategory.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!blogCategory)
    return res.status(404).json({ msg: "Blog Category tidak ditemukan" });
  try {
    BlogCategory.destroy({
      where: {
        id: blogCategory.id,
      },
    });
    res.status(200).json({ msg: "Blog Category Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
