import db from "../models";
import Sequelize from "sequelize";
import ResponseUser from "../dtos/responses/user/ResponseUser";
import argon2 from "argon2";
export async function getUsers(req, res) {
  const users = await db.User.findAll();
  const formattedUsers = users.map((user) => new ResponseUser(user));
  res.status(200).json({
    message: "Get users successfully",
    data: formattedUsers,
  });
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await db.User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "Get User by ID successfully",
    data: new ResponseUser(user),
  });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const existingUser = await db.User.findByPk(id);

  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const updatedData = {
    email: req.body.email ?? existingUser.email,
    name: req.body.name ?? existingUser.name,
    role: req.body.role ?? existingUser.role,
    avatar: req.body.avatar ?? existingUser.avatar,
    phone: req.body.phone ?? existingUser.phone,
  };

  await db.User.update(updatedData, {
    where: { id },
  });

  const updatedUser = await db.User.findByPk(id);

  return res.status(200).json({
    message: "Update user successfully",
    data: new ResponseUser(updatedUser),
  });
}

//insert user
export async function registerUser(req, res) {
  const { email, phone, password } = req.body;

  // Ensure at least email or phone is provided
  if (!email && !phone) {
    return res.status(400).json({
      message: "Either email or phone number is required",
    });
  }

  // Check if user with the same email or phone already exists
  const whereConditions = [];
  if (email) {
    whereConditions.push({ email });
  }
  if (phone) {
    whereConditions.push({ phone });
  }

  const existingUser = await db.User.findOne({
    where: {
      [Sequelize.Op.or]: whereConditions,
    },
  });

  if (existingUser) {
    const conflictField =
      existingUser.email === email ? "Email" : "Phone number";
    return res.status(409).json({
      message: `${conflictField} already exists`,
    });
  }

  // Ensure password is provided
  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const hashedPassword = await argon2.hash(password);
  const userData = await db.User.create({
    ...req.body,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Register successfully",
    data: new ResponseUser(userData),
  });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedRows = await db.User.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "Delete user successfully",
  });
}
