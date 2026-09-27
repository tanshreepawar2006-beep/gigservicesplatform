const Booking = require('../models/Booking');
const Service = require('../models/Service');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (Customer only)
const createBooking = async (req, res, next) => {
  try {
    const { serviceId, date, timeSlot, address, notes, customerPhone } = req.body;

    if (!serviceId || !date || !timeSlot || !address || !address.street || !address.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all booking details: service, date, time slot, and full address.'
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'The requested service was not found.'
      });
    }

    // Customer cannot book their own service if they are also registered as provider
    if (service.providerId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot book a service that you offer.'
      });
    }

    const cityCoords = {
      Bengaluru: { lat: 12.9352, lng: 77.6245 },
      Mumbai: { lat: 19.0760, lng: 72.8777 },
      'Delhi NCR': { lat: 28.6139, lng: 77.2090 },
      Hyderabad: { lat: 17.3850, lng: 78.4867 }
    };
    const city = address.city || 'Bengaluru';
    const coords =
      address.coordinates && address.coordinates.lat
        ? address.coordinates
        : (cityCoords[city] || { lat: 12.9352, lng: 77.6245 });

    const booking = await Booking.create({
      customerId: req.user._id,
      providerId: service.providerId,
      serviceId: service._id,
      date,
      timeSlot,
      address: {
        street: address.street.trim(),
        city,
        pincode: address.pincode.trim(),
        landmark: address.landmark ? address.landmark.trim() : '',
        coordinates: coords
      },
      customerPhone: customerPhone || req.user.phone || '+91 98765 43210',
      notes: notes || '',
      photos: { before: [], after: [] },
      totalPrice: service.price,
      status: 'pending'
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('serviceId')
      .populate('providerId', 'name email phone city rating')
      .populate('customerId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Booking placed successfully!',
      booking: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings of the logged-in customer
// @route   GET /api/bookings/my
// @access  Private (Customer)
const getCustomerBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id })
      .populate('serviceId')
      .populate('providerId', 'name email phone city rating avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs/bookings assigned to the logged-in provider
// @route   GET /api/bookings/provider
// @access  Private (Provider)
const getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ providerId: req.user._id })
      .populate('serviceId')
      .populate('customerId', 'name email phone city avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private (Customer or Provider)
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId')
      .populate('providerId', 'name email phone city rating avatar')
      .populate('customerId', 'name email phone city avatar');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.'
      });
    }

    // Ensure only the customer or provider can view this booking
    const isCustomer = booking.customerId._id.toString() === req.user._id.toString();
    const isProvider = booking.providerId._id.toString() === req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this booking.'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Accept / Complete / Cancel)
// @route   PATCH /api/bookings/:id/status
// @access  Private
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'accepted', 'completed', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.'
      });
    }

    const isCustomer = booking.customerId.toString() === req.user._id.toString();
    const isProvider = booking.providerId.toString() === req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this booking.'
      });
    }

    // Role-specific transition rules
    if (isCustomer) {
      if (status !== 'cancelled') {
        return res.status(400).json({
          success: false,
          message: 'Customers can only cancel bookings.'
        });
      }
      if (booking.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Completed bookings cannot be cancelled.'
        });
      }
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('serviceId')
      .populate('providerId', 'name email phone city rating')
      .populate('customerId', 'name email phone');

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get provider summary analytics/stats
// @route   GET /api/bookings/provider/stats
// @access  Private (Provider)
const getProviderStats = async (req, res, next) => {
  try {
    const providerId = req.user._id;

    const [totalServices, bookings] = await Promise.all([
      Service.countDocuments({ providerId }),
      Booking.find({ providerId })
    ]);

    const pendingCount = bookings.filter((b) => b.status === 'pending').length;
    const acceptedCount = bookings.filter((b) => b.status === 'accepted').length;
    const completedCount = bookings.filter((b) => b.status === 'completed').length;
    const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

    const totalRevenue = bookings
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalServices,
        totalBookings: bookings.length,
        pendingBookings: pendingCount,
        activeBookings: acceptedCount,
        completedBookings: completedCount,
        cancelledBookings: cancelledCount,
        totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload / attach Before or After work photos to a booking
// @route   POST /api/bookings/:id/photos
// @access  Private (Customer or Provider of this booking)
const uploadBookingPhotos = async (req, res, next) => {
  try {
    const { stage, url, caption } = req.body;
    const { id } = req.params;

    if (!['before', 'after'].includes(stage)) {
      return res.status(400).json({
        success: false,
        message: 'Stage must be either "before" or "after".'
      });
    }

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid photo URL or image data.'
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.'
      });
    }

    const isCustomer = booking.customerId.toString() === req.user._id.toString();
    const isProvider = booking.providerId.toString() === req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to upload photos for this booking.'
      });
    }

    if (!booking.photos) {
      booking.photos = { before: [], after: [] };
    }
    if (!booking.photos[stage]) {
      booking.photos[stage] = [];
    }

    const newPhoto = {
      url,
      caption: caption || (stage === 'before' ? 'Pre-service condition' : 'Post-service completion'),
      uploadedAt: new Date()
    };

    booking.photos[stage].push(newPhoto);
    await booking.save();

    res.status(200).json({
      success: true,
      message: `${stage === 'before' ? 'Before' : 'After'} photo saved successfully!`,
      photos: booking.photos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a Before or After photo from a booking
// @route   DELETE /api/bookings/:id/photos/:photoId
// @access  Private (Customer or Provider of this booking)
const deleteBookingPhoto = async (req, res, next) => {
  try {
    const { id, photoId } = req.params;
    const { stage } = req.query; // 'before' or 'after'

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.'
      });
    }

    const isCustomer = booking.customerId.toString() === req.user._id.toString();
    const isProvider = booking.providerId.toString() === req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify photos for this booking.'
      });
    }

    if (booking.photos && booking.photos[stage]) {
      booking.photos[stage] = booking.photos[stage].filter(
        (p) => p._id.toString() !== photoId
      );
      await booking.save();
    }

    res.status(200).json({
      success: true,
      message: 'Photo removed successfully.',
      photos: booking.photos
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
  getProviderStats,
  uploadBookingPhotos,
  deleteBookingPhoto
};
