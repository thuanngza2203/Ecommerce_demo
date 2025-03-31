import { Sequelize } from "sequelize";
import db from "../models";

export async function getNews(req, res) {
  //get all news from db
  const news = await db.News.findAll();
  //check if news is empty
  if (news.length === 0) {
    return res.status(404).json({
      message: "No news found",
    });
  }
  res.status(200).json({
    message: "Get News successfully",
    data: news,
  });
}

export async function getNewsById(req, res) {
  const { id } = req.params;
  const news = await db.News.findByPk(id, {
    include: ["newsdetails"],
  });
  if (!news) {
    return res.status(404).json({
      message: "News not found",
    });
  }
  res.status(200).json({
    message: "Get News by ID successfully",
    data: news,
  });
}

export async function insertNews(req, res) {
  const newNews = await db.News.create(req.body);
  return res.status(201).json({
    message: "Insert news successfully",
    data: newNews,
  });
}

export async function updateNews(req, res) {
  const { id } = req.params;

  // Find news in DB
  const existingNews = await db.News.findByPk(id);

  if (!existingNews) {
    return res.status(404).json({
      message: "News not found",
    });
  }

  // Update with new data, if none provided keep old data
  const updatedData = {
    title: req.body.title ?? existingNews.title,
    image: req.body.image ?? existingNews.image,
    content: req.body.content ?? existingNews.content,
  };

  await db.News.update(updatedData, {
    where: { id },
  });

  // Get news after update
  const updatedNews = await db.News.findByPk(id);

  return res.status(200).json({
    message: "Update news successfully",
    data: updatedNews,
  });
}

export async function deleteNews(req, res) {
  const { id } = req.params;

  // Delete news
  const deletedRows = await db.News.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({
      message: "News not found",
    });
  }

  return res.status(200).json({
    message: "Delete news successfully",
  });
}
