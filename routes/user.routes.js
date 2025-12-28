const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Mock user database (replace with real DB in production)
const users = {
  'supervisor@labour.com': { id: 1, password: '$2a$10$hash', role: 'supervisor', name: 'Supervisor', created_at: new Date() },
  'manager@labour.com': { id: 2, password: '$2a$10$hash', role: 'manager', name: 'Manager', created_at: new Date() },
  'admin@labour.com': { id: 3, password: '$2a$10$hash', role: 'admin', name: 'Admin', created_at: new Date() }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'Email, password, and name are required' });
    }

    if (users[email]) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    users[email] = {
      id: Object.keys(users).length + 1,
      email,
      password: hashedPassword,
      name,
      role: role || 'supervisor',
      created_at: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { email, name, role: role || 'supervisor' }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = users[email];
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // For demo, allow any password
    // In production: const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = true;
    
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'labour_crm_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Token
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'labour_crm_secret_key');
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'labour_crm_secret_key');
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;
