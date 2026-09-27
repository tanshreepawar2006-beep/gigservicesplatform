const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'provider'],
        message: 'Role must be either customer or provider'
      },
      default: 'customer',
      required: true
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    city: {
      type: String,
      default: 'Bengaluru'
    },
    avatar: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 4.8
    },
    bio: {
      type: String,
      default: ''
    },
    license: {
      number: { type: String, default: '' },
      type: { type: String, default: '' },
      issuingAuthority: { type: String, default: '' },
      expiryDate: { type: String, default: '' },
      status: {
        type: String,
        enum: ['verified', 'pending', 'expired', 'invalid'],
        default: 'verified'
      },
      verifiedAt: { type: Date, default: Date.now },
      documentUrl: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
