import { Sequelize } from "sequelize";
import db from "../models";

export async function getCategories(req, res) {
  res.status(200).json({
    message: "Get Categories successfully",
  });
}

export async function getCategoryById(req, res) {
  res.status(200).json({
    message: "Get Category by ID successfully",
  });
}

export async function updateCategory(req, res) {
  res.status(200).json({
    message: "Update Category successfully",
  });
}

export async function insertCategory(req, res) {
  try {
    console.log("REQ.BODY:", req.body);
    const newCategory = await db.Category.create(req.body);
    res.status(201).json({
      message: "Insert category successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error inserting category:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteCategory(req, res) {
  res.status(200).json({
    message: "Delete Category successfully",
  });
}
