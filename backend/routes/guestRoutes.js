const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Guest routes
router.post('/guests', guestController.createGuest);
router.get('/guests', guestController.getAllGuests);
router.get('/guests/:id', guestController.getGuestById);
router.put('/guests/:id', guestController.updateGuest);
router.delete('/guests/:id', guestController.deleteGuest);
router.get('/guests/stats/rsvp', guestController.getRsvpStats);

module.exports = router;
