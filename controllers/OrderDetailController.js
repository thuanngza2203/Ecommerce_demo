import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models";

export async function getOrderDetails(req, res) {
  //get all order details from db
  const orderDetails = await db.OrderDetail.findAll();
  //check if order details is empty
  if (orderDetails.length === 0) {
    return res.status(404).json({
      message: "No order details found",
    });
  }
  res.status(200).json({
    message: "Get Order Details successfully",
    data: orderDetails,
  });
}

export async function getOrderDetailById(req, res) {
  const { id } = req.params;
  const orderDetail = await db.OrderDetail.findByPk(id);

  if (!orderDetail) {
    return res.status(404).json({
      message: "Order detail not found",
    });
  }

  return res.status(200).json({
    message: "Get order detail successfully",
    data: orderDetail,
  });
}

export async function insertOrderDetail(req, res) {
  const newOrderDetail = await db.OrderDetail.create(req.body);
  return res.status(201).json({
    message: "Insert order detail successfully",
    data: newOrderDetail,
  });
}

export async function updateOrderDetail(req, res) {
  const { id } = req.params;

  // Tìm chi tiết đơn hàng trong DB
  const existingOrderDetail = await db.OrderDetail.findByPk(id);

  if (!existingOrderDetail) {
    return res.status(404).json({
      message: "Order detail not found",
    });
  }

  // Cập nhật với dữ liệu mới, nếu không có thì giữ dữ liệu cũ
  const updatedData = {
    order_id: req.body.order_id ?? existingOrderDetail.order_id,
    product_id: req.body.product_id ?? existingOrderDetail.product_id,
    quantity: req.body.quantity ?? existingOrderDetail.quantity,
    price: req.body.price ?? existingOrderDetail.price,
  };

  await db.OrderDetail.update(updatedData, {
    where: { id },
  });

  // Lấy chi tiết đơn hàng sau khi cập nhật
  const updatedOrderDetail = await db.OrderDetail.findByPk(id);

  return res.status(200).json({
    message: "Update order detail successfully",
    data: updatedOrderDetail,
  });
}

export async function deleteOrderDetail(req, res) {
  const { id } = req.params;

  // Xóa chi tiết đơn hàng
  const deletedRows = await db.OrderDetail.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "Order detail not found",
    });
  }

  return res.status(200).json({
    message: "Delete order detail successfully",
  });
}
