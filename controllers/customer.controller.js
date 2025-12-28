const Customer = require('../models/Customer');
const { Op } = require('sequelize');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
exports.getAllCustomers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${search}%` } },
        { mobile: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Customer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching customers' });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching customer' });
  }
};

// @desc    Create new customer
// @route   POST /api/customers
// @access  Private
exports.createCustomer = async (req, res) => {
  try {
    const { full_name, email, mobile, address, city, state, pincode, customer_type } = req.body;

    // Generate customer code
    const lastCustomer = await Customer.findOne({
      order: [['id', 'DESC']]
    });
    const nextId = lastCustomer ? lastCustomer.id + 1 : 1;
    const customer_code = `CU${String(nextId).padStart(4, '0')}`;

    const customer = await Customer.create({
      customer_code,
      full_name,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
      customer_type,
      agent_id: req.user.id
    });

    res.status(201).json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating customer' });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.update(req.body);

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating customer' });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private (Admin only)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.destroy();

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting customer' });
  }
};
