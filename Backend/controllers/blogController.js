
const Blog = require('../models/Blog');
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

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : '';
  const blog = new Blog({ title, content, image });
  await blog.save();
  res.status(201).json(blog);
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : undefined;
  const updateData = { title, content };
  if (image) updateData.image = image;
  const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.json({ message: 'Blog deleted' });
};
