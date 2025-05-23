
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
});
