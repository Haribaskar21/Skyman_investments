
const News = require('../models/News');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single('image');

exports.upload = upload;

exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : '';
  const news = new News({ title, content, image });
  await news.save();
  res.status(201).json(news);
};

exports.getAllNews = async (req, res) => {
  const newsList = await News.find();
  res.json(newsList);
};

exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : undefined;
  const updateData = { title, content };
  if (image) updateData.image = image;
  const news = await News.findByIdAndUpdate(id, updateData, { new: true });
  res.json(news);
};

exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  await News.findByIdAndDelete(id);
  res.json({ message: 'News deleted' });
};
