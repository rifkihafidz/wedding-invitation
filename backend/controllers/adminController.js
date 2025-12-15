const Guest = require('../models/Guest');

// Get RSVP Statistics
exports.getRsvpStats = async (req, res) => {
  try {
    const total = await Guest.countDocuments();
    const confirmed = await Guest.countDocuments({ rsvpStatus: 'confirmed' });
    const declined = await Guest.countDocuments({ rsvpStatus: 'declined' });
    const pending = await Guest.countDocuments({ rsvpStatus: 'pending' });

    res.status(200).json({
      status: 'success',
      data: {
        total,
        confirmed,
        declined,
        pending,
        confirmationRate: total > 0 ? ((confirmed / total) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get All Guests with RSVP Status
exports.getAllGuestsRsvp = async (req, res) => {
  try {
    const guests = await Guest.find()
      .sort({ respondedAt: -1, createdAt: -1 })
      .select('name phone rsvpStatus message respondedAt createdAt');

    res.status(200).json({
      status: 'success',
      data: guests
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get Guests by Status
exports.getGuestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!['pending', 'confirmed', 'declined'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const guests = await Guest.find({ rsvpStatus: status })
      .sort({ respondedAt: -1, createdAt: -1 })
      .select('name phone rsvpStatus message respondedAt createdAt');

    res.status(200).json({
      status: 'success',
      data: guests
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Export guests as CSV
exports.exportGuestsAsCSV = async (req, res) => {
  try {
    const guests = await Guest.find().select('name phone rsvpStatus message respondedAt');

    // Create CSV content
    let csv = 'Name,Phone,Status,Message,Responded At\n';
    guests.forEach(guest => {
      const escapedMessage = (guest.message || '').replace(/"/g, '""');
      csv += `"${guest.name}","${guest.phone || ''}","${guest.rsvpStatus}","${escapedMessage}","${guest.respondedAt || ''}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rsvp-responses.csv"');
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const total = await Guest.countDocuments();
    const confirmed = await Guest.countDocuments({ rsvpStatus: 'confirmed' });
    const declined = await Guest.countDocuments({ rsvpStatus: 'declined' });
    const pending = await Guest.countDocuments({ rsvpStatus: 'pending' });

    // Recent responses
    const recentResponses = await Guest.find({ rsvpStatus: { $ne: 'pending' } })
      .limit(5)
      .sort({ respondedAt: -1 })
      .select('name rsvpStatus respondedAt');

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          total,
          confirmed,
          declined,
          pending,
          confirmationRate: total > 0 ? ((confirmed / total) * 100).toFixed(2) : 0
        },
        recentResponses
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete guest message
exports.deleteGuestMessage = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findByIdAndUpdate(
      guestId,
      { message: '' },
      { new: true }
    ).select('name phone rsvpStatus message respondedAt');

    if (!guest) {
      return res.status(404).json({
        status: 'error',
        message: 'Guest not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Message deleted successfully',
      data: guest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete entire guest record
exports.deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findByIdAndDelete(guestId);

    if (!guest) {
      return res.status(404).json({
        status: 'error',
        message: 'Guest not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Guest deleted successfully',
      data: guest
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete all guests
exports.deleteAllGuests = async (req, res) => {
  try {
    const result = await Guest.deleteMany({});

    res.status(200).json({
      status: 'success',
      message: `Deleted ${result.deletedCount} guests`,
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
