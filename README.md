# Real Estate CRM Backend API

Backend API for Real Estate & Labour Management CRM System

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE real_estate_crm;
USE real_estate_crm;

# Run the SQL schema from BACKEND_IMPLEMENTATION_GUIDE.md
# Copy and paste all CREATE TABLE queries
```

### 3. Configure Environment
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and update your database credentials
```

### 4. Start Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on: http://localhost:3000

## 🖥️ Frontend Pages

Once the server is running, open these pages directly:
- Dashboard: http://localhost:3000/dashboard.html
- Labour/Contractors: http://localhost:3000/workers.html
- Attendance: http://localhost:3000/attendance.html
- Payments: http://localhost:3000/payments.html
- Projects: http://localhost:3000/projects.html
- Reports: http://localhost:3000/reports.html

Static assets (HTML/CSS/JS) are served from the project root.

## 📡 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (Protected)
- PUT `/api/auth/profile` - Update profile (Protected)
- POST `/api/auth/change-password` - Change password (Protected)

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics (Protected)
- GET `/api/dashboard/new-agents` - Get new agents list (Protected)
- GET `/api/dashboard/new-customers` - Get new customers list (Protected)

### Customers
- GET `/api/customers` - Get all customers (Protected)
- GET `/api/customers/:id` - Get customer by ID (Protected)
- POST `/api/customers` - Create customer (Protected)
- PUT `/api/customers/:id` - Update customer (Protected)
- DELETE `/api/customers/:id` - Delete customer (Admin only)

### Projects
- GET `/api/projects` - Get all projects (Protected)
- GET `/api/projects/:id` - Get project by ID (Protected)
- POST `/api/projects` - Create project (Protected)
- PUT `/api/projects/:id` - Update project (Protected)
- DELETE `/api/projects/:id` - Delete project (Protected)

## 🧪 Testing API with Postman

### 1. Register a User
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "Admin@123",
  "full_name": "Super Admin",
  "mobile": "9876543210",
  "role": "super_admin"
}
```

### 2. Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Response will include a JWT token. Copy this token.

### 3. Use Token for Protected Routes
```
GET http://localhost:3000/api/dashboard/stats
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── dashboard.controller.js
│   ├── customer.controller.js
│   ├── project.controller.js
│   └── sales.controller.js
├── middleware/
│   └── auth.js              # JWT verification
├── models/
│   ├── User.js              # User model
│   ├── Customer.js          # Customer model
│   └── Project.js           # Project model
├── routes/
│   ├── auth.routes.js       # Auth routes
│   ├── dashboard.routes.js  # Dashboard routes
│   ├── customer.routes.js   # Customer routes
│   ├── project.routes.js    # Project routes
│   └── sales.routes.js      # Sales routes
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication.

After login, include the token in all protected requests:
```
Authorization: Bearer <your_jwt_token>
```

## 🧰 Troubleshooting

- "Access denied for user 'root'@'localhost' (using password: NO)":
  - Update DB credentials in `.env` (`DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`).
  - Ensure MySQL is running and the `real_estate_crm` database exists.
  - The server will still serve the static pages even if DB auth fails.

## ⏹️ Stop Server

- Press `Ctrl+C` in the terminal where the server is running.

## 🛠️ Next Steps

1. ✅ Basic API setup complete
2. ✅ Authentication working
3. ✅ Dashboard API ready
4. ✅ Customer CRUD ready
5. ✅ Project CRUD ready
6. ⏳ Add Sales module
7. ⏳ Add Vendor module
8. ⏳ Add Purchase module
9. ⏳ Add Accounting module
10. ⏳ Integrate with frontend

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [JWT.io](https://jwt.io/)
