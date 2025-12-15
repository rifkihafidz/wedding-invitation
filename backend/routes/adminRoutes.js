const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin authentication middleware (simple key check)
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const envKey = process.env.ADMIN_KEY;
  
  if (adminKey !== envKey) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  
  next();
};

// Apply admin auth to all routes
router.use(adminAuth);

// Dashboard summary
router.get('/dashboard', adminController.getDashboardSummary);

// RSVP stats
router.get('/stats', adminController.getRsvpStats);

// All guests with RSVP
router.get('/guests', adminController.getAllGuestsRsvp);

// Guests by status
router.get('/guests/:status', adminController.getGuestsByStatus);

// Export as CSV
router.get('/export/csv', adminController.exportGuestsAsCSV);

// Delete guest message
router.delete('/guests/:guestId/message', adminController.deleteGuestMessage);

// Delete entire guest record
router.delete('/guests/:guestId', adminController.deleteGuest);

// Delete all guests
router.delete('/guests-all/delete', adminController.deleteAllGuests);

module.exports = router;
