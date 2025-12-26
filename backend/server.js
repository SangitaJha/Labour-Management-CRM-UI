const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML/CSS/JS) from project root
const frontendDir = path.resolve(__dirname, '..');
app.use(express.static(frontendDir));

// Test database connection (non-blocking)
db.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    // Auto-sync models if DB is connected
    const syncDb = require('./sync-db');
    syncDb().catch(err => console.log('⚠️  Model sync skipped:', err.message));
    
    // Seed demo users
    const seedUsers = require('./seeders/seed-users');
    seedUsers().catch(err => console.log('⚠️  User seeding skipped:', err.message));
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    console.log('💡 Server will run without database. Update credentials in backend/.env to enable APIs.');
  });

// Import Routes
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const customerRoutes = require('./routes/customer.routes');
const projectRoutes = require('./routes/project.routes');
const salesRoutes = require('./routes/sales.routes');
const siteRoutes = require('./routes/site.routes');
const workerRoutes = require('./routes/worker.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const paymentRoutes = require('./routes/payment.routes');
const exportRoutes = require('./routes/export.routes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/labour', workerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/export', exportRoutes);

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Labour Management CRM API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth (POST /login, /register)',
      dashboard: '/api/dashboard (GET)',
      customers: '/api/customers (GET, POST, PUT, DELETE)',
      projects: '/api/projects (GET, POST, PUT, DELETE)',
      sites: '/api/sites (GET, POST, PUT, DELETE)',
      workers: '/api/labour (GET, POST, PUT, DELETE)',
      attendance: '/api/attendance (GET, POST, PUT, DELETE, workflow actions)',
      payments: '/api/payments (GET, POST, PUT, DELETE)',
      exports: '/api/export (GET /customers, /projects, /attendance, /payments)',
      health: '/api/health (GET)'
    },
    documentation: 'See API_DOCUMENTATION.md for details'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve main landing page for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Catch-all for unmatched routes - serve index or 404
app.use((req, res) => {
  const filePath = path.join(frontendDir, req.path);
  if (req.path.endsWith('.html')) {
    res.sendFile(filePath, { root: '/' }, (err) => {
      if (err) {
        res.status(404).json({ error: 'Page not found' });
      }
    });
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;

try {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`✓ Server is ready to accept connections`);
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err);
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy. Kill it or try: PORT=3001 node server.js`);
      process.exit(1);
    }
  });

  // Keep process alive
  process.stdin.resume();
} catch (err) {
  console.error('❌ Fatal server error:', err);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
