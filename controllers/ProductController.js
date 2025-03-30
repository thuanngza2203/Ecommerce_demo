import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models";
import InsertProductRequest from "../dtos/requests/insertProductRequest";

export async function getProducts(req, res) {
  //search and paging
  //page = 1, search ='', pageSize = 10
  const { search = "", page = 1 } = req.query;
  const pageSize = 3;
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  const [products, total] = await Promise.all([
    db.Product.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    }),
    db.Product.count({
      where: whereClause,
    }),
  ]);
  res.status(200).json({
    message: "Get products successfully",
    data: products,
    pagination: {
      page: parseInt(page),
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    },
  });
}

export async function getProductById(req, res) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.status(200).json({
    message: "Get Product by ID successfully",
    data: product,
  });
}

export async function updateProduct(req, res) {
  res.status(200).json({
    message: "Update product successfully",
  });
}

export async function insertProduct(req, res) {
  // Validate request body using the InsertProductRequest DTO

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
