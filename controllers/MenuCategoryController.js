import MenuCategory from "../models/MenuCategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const response = await MenuCategory.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await MenuCategory.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    await MenuCategory.create(req.body);
    res.status(201).json({ msg: "Category Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCateogry = async (req, res) => {
  try {
    await MenuCategory.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Category Updated" });
  } catch (error) {}
};

export const deleteCategory = async (req, res) => {
  try {
    await MenuCategory.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Category Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
