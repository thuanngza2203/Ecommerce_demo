import { Sequelize } from "sequelize";
import db from "../models";
import InsertProductRequest from "../dtos/requests/insertProductRequest";
import asyncHandle from "../middlewares/asyncHandle";
export async function getProducts(req, res) {
  res.status(200).json({
    message: "Get Products successfully",
  });
}

export async function getProductById(req, res) {
  res.status(200).json({
    message: "Get Product by ID successfully",
  });
}

export async function updateProduct(req, res) {
  res.status(200).json({
    message: "Update product successfully",
  });
}

export async function insertProduct(req, res) {
  // Validate request body using the InsertProductRequest DTO
  const validationResult = InsertProductRequest.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: "Validation error",
      error: validationResult.error.details[0].message,
    });
  }
  console.log("REQ.BODY:", req.body);
  const newProduct = await db.Product.create(req.body);
  return res.status(201).json({
    message: "Insert product successfully",
    data: newProduct,
  });
}

export async function deleteProduct(req, res) {
  res.status(200).json({
    message: "Delete product successfully",
  });
}
