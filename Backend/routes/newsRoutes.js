
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, newsController.upload, newsController.createNews);
router.get('/', newsController.getAllNews);
router.put('/:id', verifyToken, isAdmin, newsController.upload, newsController.updateNews);
router.delete('/:id', verifyToken, isAdmin, newsController.deleteNews);

module.exports = router;
