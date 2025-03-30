import { Sequelize } from "sequelize";
import db from "../models";

export async function getCategories(req, res) {
  //get all category from db
  const categories = await db.Category.findAll();
  //check if categories is empty
  if (categories.length === 0) {
    return res.status(404).json({
      message: "No categories found",
    });
  }
  res.status(200).json({
    message: "Get Categories successfully",
    data: categories,
  });
}

export async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  res.status(200).json({
    message: "Get Category by ID successfully",
    data: category,
  });
}

export async function insertCategory(req, res) {
  const newCategory = await db.Category.create(req.body);
  return res.status(201).json({
    message: "Insert category successfully",
    data: newCategory,
  });
}

export async function updateCategory(req, res) {
  const { id } = req.params;

  // Tìm danh mục trong DB
  const existingCategory = await db.Category.findByPk(id);

  if (!existingCategory) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  // Cập nhật với dữ liệu mới, nếu không có thì giữ dữ liệu cũ
  const updatedData = {
    name: req.body.name ?? existingCategory.name,
    image: req.body.image ?? existingCategory.image,
  };

  await db.Category.update(updatedData, {
    where: { id },
  });

  // Lấy danh mục sau khi cập nhật
  const updatedCategory = await db.Category.findByPk(id);

  return res.status(200).json({
    message: "Update category successfully",
    data: updatedCategory,
  });
}

export async function deleteCategory(req, res) {
  const { id } = req.params;

  // Xóa danh mục
  const deletedRows = await db.Category.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  return res.status(200).json({
    message: "Delete category successfully",
  });
}
