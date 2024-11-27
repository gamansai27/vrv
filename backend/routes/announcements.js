// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();
const { getAnnouncements, addAnnouncement, deleteAnnouncement } = require('../controllers/announcementsController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/', authMiddleware(), getAnnouncements);

// Route to add announcement (Admin only)
router.post('/add', authMiddleware(['admin']), addAnnouncement);

// Route to delete announcement (Admin only)
router.delete('/:id', authMiddleware(['admin']), deleteAnnouncement);

module.exports = router;
