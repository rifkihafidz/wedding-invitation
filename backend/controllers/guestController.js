const Guest = require('../models/Guest');

// Create a new guest RSVP
exports.createGuest = async (req, res) => {
  try {
    const { name, phone, rsvpStatus, message } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required',
      });
    }

    const guest = new Guest({
      name,
      phone,
      rsvpStatus: rsvpStatus || 'pending',
      message,
      respondedAt: new Date(),
    });

    await guest.save();

    res.status(201).json({
      status: 'success',
      message: 'Guest RSVP received successfully',
      data: guest,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating guest',
      error: error.message,
    });
  }
};

// Get all guests
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      message: 'Guests retrieved successfully',
      count: guests.length,
      data: guests,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching guests',
      error: error.message,
    });
  }
};

// Get guest by ID
exports.getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({
        status: 'error',
        message: 'Guest not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: guest,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching guest',
      error: error.message,
    });
  }
};

// Update guest RSVP
exports.updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!guest) {
      return res.status(404).json({
        status: 'error',
        message: 'Guest not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Guest updated successfully',
      data: guest,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating guest',
      error: error.message,
    });
  }
};

// Delete guest
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);

    if (!guest) {
      return res.status(404).json({
        status: 'error',
        message: 'Guest not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Guest deleted successfully',
      data: guest,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting guest',
      error: error.message,
    });
  }
};

// Get RSVP statistics
exports.getRsvpStats = async (req, res) => {
  try {
    const stats = await Guest.aggregate([
      {
        $group: {
          _id: '$rsvpStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalGuests = await Guest.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        totalGuests,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching RSVP statistics',
      error: error.message,
    });
  }
};
