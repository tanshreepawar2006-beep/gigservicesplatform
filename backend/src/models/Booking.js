const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required']
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Provider ID is required']
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service ID is required']
    },
    date: {
      type: String,
      required: [true, 'Booking date is required']
    },
    timeSlot: {
      type: String,
      required: [true, 'Service time slot is required']
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required']
      },
      city: {
        type: String,
        default: 'Bengaluru'
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required']
      },
      landmark: {
        type: String,
        default: ''
      },
      coordinates: {
        lat: { type: Number, default: 12.9352 },
        lng: { type: Number, default: 77.6245 }
      }
    },
    customerPhone: {
      type: String,
      default: '+91 98765 43210'
    },
    notes: {
      type: String,
      default: ''
    },
    photos: {
      before: [
        {
          url: { type: String, required: true },
          caption: { type: String, default: 'Pre-service condition' },
          uploadedAt: { type: Date, default: Date.now }
        }
      ],
      after: [
        {
          url: { type: String, required: true },
          caption: { type: String, default: 'Post-service completion' },
          uploadedAt: { type: Date, default: Date.now }
        }
      ]
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
