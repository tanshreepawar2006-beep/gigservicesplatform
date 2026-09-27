const Service = require('../models/Service');

// @desc    Get all services with filtering & search
// @route   GET /api/services
// @access  Public
const getServices = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    const query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'rating') sortOptions = { rating: -1 };

    const services = await Service.find(query)
      .populate('providerId', 'name email phone city rating bio avatar')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'providerId',
      'name email phone city rating bio avatar'
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'The requested service was not found.'
      });
    }

    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service (Provider only)
// @route   POST /api/services
// @access  Private (Provider)
const createService = async (req, res, next) => {
  try {
    const { title, category, description, price, duration, imageUrl, features } = req.body;

    if (!title || !category || !description || !price || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, category, description, price, and imageUrl.'
      });
    }

    const service = await Service.create({
      title: title.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      duration: duration || '60 mins',
      imageUrl: imageUrl.trim(),
      features: features && features.length > 0 ? features : undefined,
      providerId: req.user._id
    });

    const populatedService = await Service.findById(service._id).populate(
      'providerId',
      'name email phone city rating bio avatar'
    );

    res.status(201).json({
      success: true,
      message: 'Service created successfully!',
      service: populatedService
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service (Provider only)
// @route   PUT /api/services/:id
// @access  Private (Provider)
const updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    // Verify ownership
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this service.'
      });
    }

    const { title, category, description, price, duration, imageUrl, features, isActive } = req.body;

    service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(category && { category }),
        ...(description && { description: description.trim() }),
        ...(price !== undefined && { price: Number(price) }),
        ...(duration && { duration }),
        ...(imageUrl && { imageUrl: imageUrl.trim() }),
        ...(features && { features }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true, runValidators: true }
    ).populate('providerId', 'name email phone city rating bio avatar');

    res.status(200).json({
      success: true,
      message: 'Service updated successfully!',
      service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service (Provider only)
// @route   DELETE /api/services/:id
// @access  Private (Provider)
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.'
      });
    }

    // Verify ownership
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this service.'
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get services created by the logged in provider
// @route   GET /api/services/my/listings
// @access  Private (Provider)
const getMyServices = async (req, res, next) => {
  try {
    const services = await Service.find({ providerId: req.user._id }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getMyServices
};
