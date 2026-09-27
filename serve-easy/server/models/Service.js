const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Cleaning',
        'Plumbing',
        'Electrical',
        'Painting',
        'Appliance Repair',
        'AC Services',
        'Grooming & Salon'
      ]
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    duration: {
      type: String,
      default: '60 mins'
    },
    location: {
      type: String,
      default: 'Mumbai'
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    rating: {
      type: Number,
      default: 4.8
    },
    reviewsCount: {
      type: Number,
      default: 18
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', serviceSchema);
