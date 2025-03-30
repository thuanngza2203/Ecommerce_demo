import { Sequelize } from "sequelize";
import db from "../models";

export async function getBrands(req, res) {
  res.status(200).json({
    message: "Get Brands successfully",
  });
}

export async function getBrandById(req, res) {
  res.status(200).json({
    message: "Get Brand by ID successfully",
  });
}

export async function updateBrand(req, res) {
  res.status(200).json({
    message: "Update Brand successfully",
  });
}

export async function insertBrand(req, res) {
  try {
    console.log("REQ.BODY:", req.body);
    const newBrand = await db.Brand.create(req.body);
    res.status(201).json({
      message: "Insert brand successfully",
      data: newBrand,
    });
  } catch (error) {
    console.error("Error inserting brand:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteBrand(req, res) {
  res.status(200).json({
    message: "Delete Brand successfully",
  });
}
