const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, providerOnly } = require('../middleware/authMiddleware');

// @route   GET /api/services
// @desc    Get all services with optional filtering (category, search, providerId)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, providerId } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (providerId) {
      query.providerId = providerId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await Service.find(query)
      .populate('providerId', 'name email phone city bio')
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    console.error('Fetch services error:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'providerId',
      'name email phone city bio createdAt'
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Fetch single service error:', error);
    res.status(500).json({ message: 'Failed to fetch service details' });
  }
});

// @route   POST /api/services
// @desc    Create a new service listing
// @access  Private (Provider only)
router.post('/', protect, providerOnly, async (req, res) => {
  try {
    const { title, category, description, price, duration, location, imageUrl } = req.body;

    if (!title || !category || !description || !price || !imageUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const service = await Service.create({
      title,
      category,
      description,
      price: Number(price),
      duration: duration || '60 mins',
      location: location || req.user.city || 'Mumbai',
      imageUrl,
      providerId: req.user._id,
      rating: 4.9,
      reviewsCount: 1
    });

    const populatedService = await Service.findById(service._id).populate(
      'providerId',
      'name email phone city bio'
    );

    res.status(201).json(populatedService);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: error.message || 'Failed to create service' });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private (Provider only - owner)
router.put('/:id', protect, providerOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this service' });
    }

    const { title, category, description, price, duration, location, imageUrl } = req.body;

    service.title = title || service.title;
    service.category = category || service.category;
    service.description = description || service.description;
    service.price = price !== undefined ? Number(price) : service.price;
    service.duration = duration || service.duration;
    service.location = location || service.location;
    service.imageUrl = imageUrl || service.imageUrl;

    const updatedService = await service.save();
    const populated = await Service.findById(updatedService._id).populate(
      'providerId',
      'name email phone city'
    );

    res.json(populated);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service listing
// @access  Private (Provider only - owner)
router.delete('/:id', protect, providerOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await service.deleteOne();
    res.json({ message: 'Service successfully removed' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

module.exports = router;
