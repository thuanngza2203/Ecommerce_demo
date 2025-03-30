import { Sequelize } from "sequelize";
import db from "../models";
const { Op } = Sequelize;
export async function getOrders(req, res) {
  //get all orders
  const orders = await db.Order.findAll();
  //check if orders is empty
  if (orders.length === 0) {
    return res.status(404).json({
      message: "No orders found",
    });
  }
  //return orders
  return res.status(200).json({
    message: "Get orders successfully",
    data: orders,
  });
}

export async function getOrderById(req, res) {
  const { id } = req.params;
  // Tìm đơn hàng trong DB
  const order = await db.Order.findByPk(id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.status(200).json({
    message: "Get order successfully",
    data: order,
  });
}

export async function insertOrder(req, res) {
  const newOrder = await db.Order.create(req.body);
  return res.status(201).json({
    message: "Insert order successfully",
    data: newOrder,
  });
}

export async function updateOrder(req, res) {
  const { id } = req.params;
  // Tìm đơn hàng trong DB
  const existingOrder = await db.Order.findByPk(id);

  if (!existingOrder) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  // Cập nhật với dữ liệu mới, nếu không có thì giữ dữ liệu cũ
  const updatedData = {
    user_id: req.body.user_id ?? existingOrder.user_id,
    status: req.body.status ?? existingOrder.status,
    note: req.body.note ?? existingOrder.note,
    total: req.body.total ?? existingOrder.total,
  };

  await db.Order.update(updatedData, {
    where: { id },
  });

  // Lấy đơn hàng sau khi cập nhật
  const updatedOrder = await db.Order.findByPk(id);

  return res.status(200).json({
    message: "Update order successfully",
    data: updatedOrder,
  });
}

export async function deleteOrder(req, res) {
  const { id } = req.params;

  // Xóa đơn hàng
  const deletedRows = await db.Order.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.status(200).json({
    message: "Delete order successfully",
  });
}
