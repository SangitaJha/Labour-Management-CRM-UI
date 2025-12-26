const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id, extraPayload = {}) => {
  const secret = process.env.JWT_SECRET || 'demo-secret';
  return jwt.sign({ id, ...extraPayload }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '1h'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Please provide name, email, password, and phone' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'supervisor'
    });

    // Generate token
    const token = generateToken(user.id, {
      email: user.email,
      name: user.name,
      role: user.role
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const email = req.body.email || 'demo@labourcrm.com';
    const password = req.body.password || 'demo123';

    // Demo mode - hardcoded credentials when DB is not available
    const demoUsers = {
      'admin@labourcrm.com': { 
        id: 1, 
        name: 'Admin User', 
        email: 'admin@labourcrm.com', 
        phone: '+91 9876543210',
        role: 'admin', 
        password: 'admin123' 
      },
      'manager@labourcrm.com': { 
        id: 2, 
        name: 'Project Manager', 
        email: 'manager@labourcrm.com', 
        phone: '+91 9876543211',
        role: 'manager', 
        password: 'manager123' 
      },
      'supervisor@labourcrm.com': { 
        id: 3, 
        name: 'Site Supervisor', 
        email: 'supervisor@labourcrm.com', 
        phone: '+91 9876543212',
        role: 'supervisor', 
        password: 'supervisor123' 
      },
      'accounts@labourcrm.com': { 
        id: 4, 
        name: 'Accounts Officer', 
        email: 'accounts@labourcrm.com', 
        phone: '+91 9876543213',
        role: 'accounts', 
        password: 'accounts123' 
      }
    };

    // Try database first
    let user = null;
    try {
      user = await User.findOne({ where: { email } });
    } catch (dbError) {
      console.log('Database not available, using demo mode');
    }

    // If no database or user missing, allow open demo login
    if (!user) {
      const demoUser = demoUsers[email] || {
        id: 9999,
        name: 'Demo User',
        email,
        phone: '+91 0000000000',
        role: 'admin',
        password: password
      };

      const token = generateToken(demoUser.id, {
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role
      });

      return res.json({
        success: true,
        token,
        user: {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          phone: demoUser.phone,
          role: demoUser.role,
          last_login: new Date()
        }
      });
    }

    // Database user flow
    if (!user.is_active) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.last_login = new Date();
    user.last_login_ip = req.ip || req.connection.remoteAddress;
    await user.save();

    // Generate token
    const token = generateToken(user.id, {
      email: user.email,
      name: user.name,
      role: user.role
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        last_login: user.last_login
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    // Demo users for fallback
    const demoUsers = {
      1: { id: 1, name: 'Admin User', email: 'admin@labourcrm.com', phone: '+91 9876543210', role: 'admin', created_at: new Date(), is_active: true },
      2: { id: 2, name: 'Project Manager', email: 'manager@labourcrm.com', phone: '+91 9876543211', role: 'manager', created_at: new Date(), is_active: true },
      3: { id: 3, name: 'Site Supervisor', email: 'supervisor@labourcrm.com', phone: '+91 9876543212', role: 'supervisor', created_at: new Date(), is_active: true },
      4: { id: 4, name: 'Accounts Officer', email: 'accounts@labourcrm.com', phone: '+91 9876543213', role: 'accounts', created_at: new Date(), is_active: true }
    };

    let user = null;
    try {
      user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
    } catch (dbError) {
      console.log('Database not available, using demo user');
      user = demoUsers[req.user.id];
    }

    if (!user) {
      user = demoUsers[req.user.id] || demoUsers[1];
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findByPk(req.user.id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Please provide current and new password' });
    }

    const user = await User.findByPk(req.user.id);

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error changing password' });
  }
};
