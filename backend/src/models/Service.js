const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a service title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    category: {
      type: String,
      required: [true, 'Please specify a service category'],
      enum: [
        'Cleaning',
        'Appliances',
        'Electrical',
        'Plumbing',
        'Grooming',
        'Pest Control'
      ]
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed service description'],
      maxlength: [1500, 'Description cannot exceed 1500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide the service price in INR'],
      min: [99, 'Price must be at least ₹99']
    },
    duration: {
      type: String,
      default: '60 mins'
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide a valid image URL for the service']
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A service must be linked to a service provider']
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 24
    },
    features: {
      type: [String],
      default: [
        'Verified & Background-Checked Professional',
        'Standard 30-Day Service Guarantee',
        'Transparent Pricing with No Hidden Costs'
      ]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Add text indexing for fast search
serviceSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
