const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  checkProviderLicense,
  updateProviderLicense
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/verify-license/:providerId', checkProviderLicense);
router.put('/provider/license', protect, authorize('provider'), updateProviderLicense);

module.exports = router;
