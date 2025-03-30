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

export async function updateCategory(req, res) {
  res.status(200).json({
    message: "Update Category successfully",
  });
}

export async function insertCategory(req, res) {
  const category = await db.Category.create(req.body);
  res.status(201).json({
    message: "Insert Category successfully",
    data: category,
  });
}

export async function deleteCategory(req, res) {
  res.status(200).json({
    message: "Delete Category successfully",
  });
}
