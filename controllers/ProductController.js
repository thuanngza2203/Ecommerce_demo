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
  const { id } = req.params;

  // Tìm sản phẩm trong DB
  const existingProduct = await db.Product.findByPk(id);

  if (!existingProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // Cập nhật với dữ liệu mới, nếu không có thì giữ dữ liệu cũ
  const updatedData = {
    name: req.body.name ?? existingProduct.name,
    price: req.body.price ?? existingProduct.price,
    oldprice: req.body.oldprice ?? existingProduct.oldprice,
    image: req.body.image ?? existingProduct.image,
    description: req.body.description ?? existingProduct.description,
    specification: req.body.specification ?? existingProduct.specification,
    buyturn: req.body.buyturn ?? existingProduct.buyturn,
    quantity: req.body.quantity ?? existingProduct.quantity,
    brand_id: req.body.brand_id ?? existingProduct.brand_id,
    category_id: req.body.category_id ?? existingProduct.category_id,
  };

  await db.Product.update(updatedData, {
    where: { id },
  });

  // Lấy sản phẩm sau khi cập nhật
  const updatedProduct = await db.Product.findByPk(id);

  return res.status(200).json({
    message: "Update product successfully",
    data: updatedProduct,
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
  const { id } = req.params;
  const deletedRows = await db.Product.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    message: "Delete product successfully",
  });
}
