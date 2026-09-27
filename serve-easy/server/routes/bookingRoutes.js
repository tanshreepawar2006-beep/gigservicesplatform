const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/bookings
// @desc    Create a new booking request
// @access  Private (Customer only)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can book services' });
    }

    const { serviceId, date, timeSlot, address, notes } = req.body;

    if (!serviceId || !date || !address) {
      return res.status(400).json({ message: 'Please provide service, booking date, and delivery address' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service no longer available' });
    }

    const booking = await Booking.create({
      customerId: req.user._id,
      providerId: service.providerId,
      serviceId: service._id,
      date,
      timeSlot: timeSlot || '10:00 AM - 12:00 PM',
      address,
      totalAmount: service.price,
      status: 'Pending',
      notes: notes || ''
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('serviceId', 'title category price imageUrl location')
      .populate('providerId', 'name email phone city')
      .populate('customerId', 'name email phone');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: error.message || 'Failed to create booking' });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get user's bookings (Customer sees placed bookings, Provider sees job requests)
// @access  Private
router.get('/my-bookings', protect, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'customer') {
      query.customerId = req.user._id;
    } else if (req.user.role === 'provider') {
      query.providerId = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate('serviceId', 'title category price imageUrl duration location')
      .populate('providerId', 'name email phone city')
      .populate('customerId', 'name email phone city')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (Accepted, Completed, Cancelled)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Accepted', 'Completed', 'Cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid booking status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking record not found' });
    }

    // Role permission checks
    const isCustomer = booking.customerId.toString() === req.user._id.toString();
    const isProvider = booking.providerId.toString() === req.user._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({ message: 'Not authorized to modify this booking' });
    }

    // Customers can only cancel their booking
    if (isCustomer && !isProvider) {
      if (status !== 'Cancelled') {
        return res.status(403).json({ message: 'Customers can only cancel bookings' });
      }
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('serviceId', 'title category price imageUrl duration location')
      .populate('providerId', 'name email phone city')
      .populate('customerId', 'name email phone city');

    res.json(updatedBooking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

module.exports = router;
