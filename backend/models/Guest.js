const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    rsvpStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'declined'],
      default: 'pending',
    },
    message: {
      type: String,
      trim: true,
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Guest', guestSchema);
