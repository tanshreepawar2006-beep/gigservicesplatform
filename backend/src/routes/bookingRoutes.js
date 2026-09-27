const express = require('express');
const router = express.Router();
const {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
  getProviderStats,
  uploadBookingPhotos,
  deleteBookingPhoto
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('customer'), createBooking);
router.get('/my', protect, authorize('customer'), getCustomerBookings);
router.get('/provider', protect, authorize('provider'), getProviderBookings);
router.get('/provider/stats', protect, authorize('provider'), getProviderStats);
router.get('/:id', protect, getBookingById);
router.patch('/:id/status', protect, updateBookingStatus);
router.post('/:id/photos', protect, uploadBookingPhotos);
router.delete('/:id/photos/:photoId', protect, deleteBookingPhoto);

module.exports = router;
