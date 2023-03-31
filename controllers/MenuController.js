import Menus from "../models/MenuModel.js";
import MenuCategory from "../models/MenuCategoryModel.js";
import path from "path";
import fs from "fs";

export const getMenus = async (req, res) => {
  try {
    const response = await Menus.findAll({
      include: [
        {
          model: MenuCategory,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMenusById = async (req, res) => {
  try {
    const response = await Menus.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: MenuCategory,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMenus = async (req, res) => {
  const menuCategory = await MenuCategory.findOne({
    where: {
      id: parseInt(req.body.Kategori),
    },
  });
  if (!menuCategory)
    return res.status(404).json({ msg: "Data tidak ditemukan" });
  if (res.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const calories = req.body.calories;
  const rating = req.body.rating;
  const nutriScore = req.body.nutriScore;
  const file = req.files.img;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/menu/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".jfif", ".webp"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5MB" });

  file.mv(`./public/images/menu/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Menus.create({
        name,
        calories,
        rating,
        nutriScore,
        img: fileName,
        url,
        menuCategoryId: menuCategory.id,
      });
      res.status(201).json({ msg: "Menu Created" });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });
};

export const updateMenus = async (req, res) => {
  const menus = await Menus.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!menus) return res.status(404).json({ msg: "Data tidak ditemukan" });

  let fileName = "";
  if (req.files === null) {
    fileName = menus.img;
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

    const filepath = `./public/images/menu/${menus.img}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/menu/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.name;
  const calories = req.body.calories;
  const rating = req.body.rating;
  const nutriScore = req.body.nutriScore;
  const url = `${req.protocol}://${req.get("host")}/images/menu/${fileName}`;
  const menuCategory = await MenuCategory.findOne({
    where: {
      id: parseInt(req.body.Kategori),
    },
  });
  if (!menuCategory)
    return res.status(404).json({ msg: "Data tidak ditemukan" });

  try {
    await Menus.update(
      {
        name,
        calories,
        rating,
        nutriScore,
        img: fileName,
        url,
        menuCategoryId: menuCategory.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Menus Updated" });
  } catch (error) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteMenus = async (req, res) => {
  const menus = await Menus.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!menus) return res.status(404).json({ msg: "Data tidak ditemukan" });

  try {
    const filepath = `./public/images/menu/${menus.img}`;
    fs.unlinkSync(filepath);
    await Menus.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Menus Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
