
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, blogController.upload, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.put('/:id', verifyToken, isAdmin, blogController.upload, blogController.updateBlog);
router.delete('/:id', verifyToken, isAdmin, blogController.deleteBlog);

module.exports = router;
