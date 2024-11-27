const Announcement = require('../models/announcements');

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const { role } = req.user; 
    if (role === 'admin' || role === 'manager') {
      // Admins and Managers can view all announcements
      announcements = await Announcement.find();
    } 
    else if (role === 'employee') {
      // Employees can only see announcements targeted for them
      announcements = await Announcement.find({ visibleTo: role });
    } 
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new announcement (Admin only)
const addAnnouncement = async (req, res) => {
  const { title, description, importance, date, visibleTo} = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      description,
      importance,
      date,
      visibleTo
    });

    await newAnnouncement.save();
    res.status(200).json({success:true , message:"Announcement created"})
  } catch (error) {
    res.status(500).json({success:false, message: 'Server error' });
  }
};

// Delete an announcement (Admin only)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success:true, message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ success:false, message: 'Server error' });
  }
};

module.exports = { getAnnouncements, addAnnouncement, deleteAnnouncement };
