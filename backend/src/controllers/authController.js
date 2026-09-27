const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'serveeasy_super_secret_jwt_key_2026_dev_prod',
    {
      expiresIn: '30d'
    }
  );
};

// @desc    Register new user (Customer or Service Provider)
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (name, email, password).'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.'
      });
    }

    const validRole = role === 'provider' ? 'provider' : 'customer';

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      role: validRole,
      phone: phone || '+91 98765 43210',
      city: city || 'Bengaluru'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please check your email or sign up.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify and try again.'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        rating: user.rating,
        bio: user.bio,
        avatar: user.avatar,
        license: user.license,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check and verify a provider's professional license
// @route   GET /api/auth/verify-license/:providerId
// @access  Public
const checkProviderLicense = async (req, res, next) => {
  try {
    const { providerId } = req.params;
    const provider = await User.findById(providerId);

    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({
        success: false,
        message: 'Provider not found.'
      });
    }

    const license = provider.license;
    if (!license || !license.number) {
      return res.status(200).json({
        success: true,
        isValid: false,
        status: 'unregistered',
        message: 'No professional license submitted for this provider.',
        provider: {
          _id: provider._id,
          name: provider.name
        }
      });
    }

    const expiry = new Date(license.expiryDate);
    const now = new Date();
    const isExpired = !isNaN(expiry.getTime()) && expiry < now;
    const diffDays = !isNaN(expiry.getTime())
      ? Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 365;

    let computedStatus = license.status || 'verified';
    if (isExpired) {
      computedStatus = 'expired';
    }

    const isValid = !isExpired && computedStatus === 'verified';

    res.status(200).json({
      success: true,
      isValid,
      status: computedStatus,
      daysRemaining: diffDays,
      license: {
        number: license.number,
        type: license.type || 'Government Certified Technician License',
        issuingAuthority: license.issuingAuthority || 'Govt. Regulatory Board',
        expiryDate: license.expiryDate || '2027-12-31',
        verifiedAt: license.verifiedAt || provider.createdAt
      },
      provider: {
        _id: provider._id,
        name: provider.name,
        city: provider.city,
        rating: provider.rating,
        avatar: provider.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update provider license details
// @route   PUT /api/auth/provider/license
// @access  Private (Provider only)
const updateProviderLicense = async (req, res, next) => {
  try {
    const { number, type, issuingAuthority, expiryDate } = req.body;

    if (!number || !type || !issuingAuthority) {
      return res.status(400).json({
        success: false,
        message: 'Please provide license number, license type, and issuing authority.'
      });
    }

    const expiry = expiryDate ? new Date(expiryDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const isExpired = expiry < new Date();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        license: {
          number: number.trim(),
          type: type.trim(),
          issuingAuthority: issuingAuthority.trim(),
          expiryDate: expiry.toISOString().split('T')[0],
          status: isExpired ? 'expired' : 'verified',
          verifiedAt: new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'License details verified and updated successfully!',
      license: updatedUser.license,
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  checkProviderLicense,
  updateProviderLicense
};
