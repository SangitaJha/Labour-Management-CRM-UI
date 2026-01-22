# 🏗️ Labour Management CRM

> **A Production-Ready Labour Attendance Management System**  
> Built with Node.js, Express, Sequelize ORM, and modern HTML5/CSS3/JavaScript

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

A comprehensive workforce management solution for construction and labour industries. Track attendance, manage payments, generate reports, and streamline your labour operations with an intuitive interface and powerful backend.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation-guide)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [User Roles & Permissions](#-user-roles--permissions)
- [Screenshots](#-screenshots)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Labour Management CRM is a complete workforce management solution designed for construction sites, contractors, and labour-intensive industries. It provides:

- **Attendance Tracking**: Mark and manage daily attendance with in/out times
- **Workflow Management**: Draft → Submit → Approve → Reject → Paid workflow
- **Auto Calculations**: Automatic calculation of hours, overtime, and wages
- **Payment Tracking**: Complete payment lifecycle management
- **Reports & Analytics**: Comprehensive reporting with CSV exports
- **Multi-User Support**: Role-based access control for teams
- **Material Tracking**: Track work details and material costs per day

### 🎭 Built for Teams

Designed for Admin, Managers, Supervisors, and Accounts departments to collaborate seamlessly on workforce management.

---

## ✨ Key Features

### 🚀 Core Functionality

#### Attendance Management
- ✅ Mark daily attendance with in/out times
- ✅ Automatic total hours calculation
- ✅ Overtime (OT) hours tracking (1.5x multiplier for hours > 8)
- ✅ Work details tracking (description, area, units, remarks)
- ✅ Material details tracking (name, quantity, unit, cost)
- ✅ Geo-location capture (latitude/longitude)
- ✅ Date-based and worker-based filtering
- ✅ Attendance history with status visualization

#### Workflow System
- 📋 **Draft** - Initial attendance entry
- 📤 **Submitted** - Submitted for approval
- ✅ **Approved** - Approved by manager/admin
- ❌ **Rejected** - Rejected with reason
- 💰 **Paid** - Payment completed

#### Payment Processing
- 💳 Multiple payment modes (Cash, Bank Transfer, UPI, Cheque)
- 📊 Payment status tracking
- 📈 Payment history and analytics
- 💵 Wage calculations with overtime
- 📋 Material cost tracking

#### User Management
- 🔐 Secure authentication with JWT tokens
- 👥 4 role types (Admin, Manager, Supervisor, Accounts)
- 🔒 Password hashing with bcrypt (10 salt rounds)
- 👤 User profiles with avatar support
- 🔑 Password change functionality
- ⏱️ Session management and auto-logout

### 📊 Reports & Analytics
- 📈 Daily attendance summary reports
- 📅 Monthly wage calculation reports
- 👷 Contractor performance analytics
- 🏗️ Project-wise attendance tracking
- 📥 CSV export for all reports
- 📊 Real-time dashboard metrics
- 💹 Financial analytics (income, expenses, pending payments)

### 🎨 User Experience
- Premium gradient-based design
- Responsive dashboard
- Intuitive navigation
- Real-time status updates
- Confirmation dialogs for critical actions
- Toast notifications
- Clean, professional styling

### 🎨 User Experience
- 🎨 Modern gradient-based UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Intuitive navigation with sidebar
- 🔔 Toast notifications for actions
- ⚡ Real-time status updates
- ✨ Smooth transitions and animations
- 🎯 Context-aware action buttons
- 💬 Confirmation dialogs for critical actions
- 🎭 Role-specific badges and indicators

### 🔒 Security & Data Protection
- Password hashing with bcrypt
- JWT token authentication
- Protected routes and APIs
- Input validation
- Role-based authorization middleware

### � Security & Data Protection
- 🔐 JWT token-based authentication
- 🔑 Bcrypt password hashing (10 salt rounds)
- 🛡️ Protected API routes with middleware
- 🚫 Input validation and sanitization
- 🔒 XSS prevention
- 💉 SQL injection prevention (Sequelize ORM)
- 🔐 CORS configuration
- 🔄 Automatic token refresh
- 🚪 Auto-logout on token expiry
- 🔍 Role-based authorization

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v14+
- **Framework**: Express.js v4.18
- **Database**: SQLite3 (Production-ready, can migrate to MySQL/PostgreSQL)
- **ORM**: Sequelize v6.35
- **Authentication**: JWT (jsonwebtoken v9.0)
- **Password Hashing**: bcryptjs v2.4
- **Validation**: express-validator v7.0
- **CORS**: cors v2.8

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Vanilla JS (ES6+)
- **Icons**: Font Awesome / Custom SVGs
- **Layout**: Flexbox & CSS Grid

### DevOps & Tools
- **Process Manager**: PM2 (ecosystem.config.js included)
- **Web Server**: Nginx (sample config included)
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot-reload

---

## ⚡ Quick Start

### Prerequisites
Ensure you have the following installed:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher (comes with Node.js)
- **Git** (optional, for cloning)

### 1️⃣ Clone or Download
```bash
# Clone the repository
git clone <repository-url>
cd Labour_Management_CRM_UI

# Or download and extract the ZIP file
```

### 2️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Start the Server
```bash
npm start
```

You should see:
```
💡 Running in DEMO MODE: Database connection and sync skipped
🚀 Server running on http://localhost:3000
📡 API available at http://localhost:3000/api
```

### 4️⃣ Open in Browser
Visit: **http://localhost:3000/login.html**

### 5️⃣ Login with Demo Account
```
Email: supervisor@labourcrm.com
Password: supervisor123
```

✅ **You're all set!** Start exploring the system.

---

## 📦 Installation Guide

### Step-by-Step Setup

### Step-by-Step Setup

#### 1. Install Backend Dependencies

1. **Clone & Navigate**
```bash
cd Labour_Management_CRM_UI/backend
npm install
```

Expected packages installed:
- express, sequelize, sqlite3
- bcryptjs, jsonwebtoken
- cors, dotenv, express-validator

#### 2. Configure Environment (Optional)

2. **Configure Environment**
```bash
# Create .env file (optional - defaults work out of the box)
cp .env.example .env
```

Edit `.env` if needed:
```env
# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_super_secure_secret_key_minimum_32_characters
JWT_EXPIRE=24h

# Database (SQLite - no configuration needed)
# For MySQL/PostgreSQL, add:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=password
# DB_NAME=labour_crm
```

#### 3. Initialize Database (Automatic)

The database is created automatically on first run. Manual sync if needed:
```bash
npm run sync-db
```

#### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Using PM2 (recommended for production):**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 5. Access the Application

Open your browser and visit:
- **Login Page**: http://localhost:3000/login.html
- **Dashboard**: http://localhost:3000/dashboard.html (after login)
- **API Docs**: http://localhost:3000/api

---

## 🏗️ Project Structure

```
Labour_Management_CRM_UI/
│
├── 📂 backend/                      # Backend API Server
│   ├── server.js                    # Main server entry point
│   ├── package.json                 # Node.js dependencies
│   ├── ecosystem.config.js          # PM2 configuration
│   ├── nginx.conf.sample            # Nginx sample config
│   │
│   ├── 📂 config/
│   │   └── database.js              # Sequelize database configuration
│   │
│   ├── 📂 controllers/              # Business logic
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── attendance.controller.js # Attendance CRUD & workflow
│   │   ├── payment.controller.js    # Payment management
│   │   ├── worker.controller.js     # Worker/labour management
│   │   ├── site.controller.js       # Site management
│   │   ├── project.controller.js    # Project management
│   │   ├── customer.controller.js   # Customer management
│   │   ├── dashboard.controller.js  # Dashboard metrics
│   │   ├── export.controller.js     # CSV export logic
│   │   └── sales.controller.js      # Sales tracking
│   │
│   ├── 📂 models/                   # Database models (Sequelize)
│   │   ├── index.js                 # Model aggregator
│   │   ├── User.js                  # User authentication model
│   │   ├── Attendance.js            # Attendance records
│   │   ├── Payment.js               # Payment records
│   │   ├── Worker.js                # Worker/labour master
│   │   ├── Site.js                  # Site/location model
│   │   ├── Project.js               # Project model
│   │   ├── Customer.js              # Customer model
│   │   └── Contractor.js            # Contractor model
│   │
│   ├── 📂 routes/                   # API route definitions
│   │   ├── auth.routes.js           # /api/auth/*
│   │   ├── attendance.routes.js     # /api/attendance/*
│   │   ├── payment.routes.js        # /api/payments/*
│   │   ├── worker.routes.js         # /api/labour/*
│   │   ├── site.routes.js           # /api/sites/*
│   │   ├── project.routes.js        # /api/projects/*
│   │   ├── customer.routes.js       # /api/customers/*
│   │   ├── dashboard.routes.js      # /api/dashboard/*
│   │   ├── export.routes.js         # /api/export/*
│   │   └── sales.routes.js          # /api/sales/*
│   │
│   ├── 📂 middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── 📂 migrations/
│   │   └── 001-create-schema.sql    # Database schema
│   │
│   ├── 📂 seeders/
│   │   └── seed-users.js            # Demo user accounts
│   │
│   └── 📂 seeds/
│       ├── seed-sites.js            # Sample site data
│       └── seed-sites-contractors.js # Sample contractor data
│
├── 📂 js/                           # Frontend JavaScript
│   ├── auth.js                      # Authentication logic
│   └── dashboard-calc.js            # Dashboard calculations
│
├── 📂 css/                          # Stylesheets
│   └── style.css                    # Main stylesheet
│
├── 📂 assets/                       # Static assets
│   ├── images/                      # Images & logos
│   └── icons/                       # Icon files
│
├── 📂 docs/                         # GitHub Pages deployment
│   └── (mirror of HTML files)
│
├── 📄 HTML Pages (Frontend)
│   ├── login.html                   # Login & registration
│   ├── dashboard.html               # Main dashboard
│   ├── attendance.html              # Attendance management
│   ├── workers.html                 # Worker management
│   ├── contractors.html             # Contractor management
│   ├── sites.html                   # Site management
│   ├── projects.html                # Project management
│   ├── payments.html                # Payment tracking
│   ├── reports.html                 # Reports & analytics
│   ├── profile.html                 # User profile
│   ├── settings.html                # User settings
│   └── test-backend.html            # API testing page
│
└── 📄 Documentation
    ├── README.md                    # This file
    ├── API_DOCUMENTATION.md         # Complete API reference
    ├── QUICKSTART.md                # 5-minute setup guide
    ├── FEATURES_CHECKLIST.md        # Feature completion status
    ├── SETUP_GUIDE.md               # Detailed setup instructions
    ├── BACKEND_IMPLEMENTATION_GUIDE.md
    ├── FRONTEND_FILES_CHECKLIST.md
    ├── HOSTINGER_DEPLOYMENT_GUIDE.md
    └── IMPLEMENTATION_SUMMARY.md
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints
  - Track in/out times
  - Work details (description, area, units)
  - Material details (name, qty, cost)
  - Workflow status visualization
  - Action buttons (Submit, Approve, Reject, Mark Paid)

- **Workers** (`workers.html`)
  - Labour master management
  - Filter by work type (10 types)
  - View worker details
  - Add/Edit worker information

- **Contractors** (`contractors.html`)
  - Manage contractors
  - View contractor statistics
  - Filter by name or status
  - Contact information display

- **Sites** (`sites.html`)
  - Project location management
  - 10 sites with 10 contractors each
  - Auto-expanded contractor details
  - Work and material tracking

- **Payments** (`payments.html`)
  - Payment status tracking
  - Payment mode selection
  - Payment history
  - Export payment reports

- **Reports** (`reports.html`)
  - Daily attendance summary
  - Monthly wage reports
  - Contractor performance
  - Project analytics

### Account Management
- **Profile** (`profile.html`)
  - View account information
  - Edit profile details
  - View joining date & last login
  - Change password link

- **Settings** (`settings.html`)
  - Change password securely
  - Notification preferences
  - Privacy settings
  - Active sessions management

## 🔐 Demo Credentials

Login with these test accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@labourcrm.com | admin123 |
| Manager | manager@labourcrm.com | manager123 |
| Supervisor | supervisor@labourcrm.com | supervisor123 |
| Accounts | accounts@labourcrm.com | accounts123 |

## 📡 API Documentation

### Authentication Endpoints
### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| POST | `/api/auth/change-password` | Change password | ✅ |

### Attendance Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/attendance` | List all attendance | ✅ |
| POST | `/api/attendance/mark` | Create attendance | ✅ |
| GET | `/api/attendance/:id` | Get single record | ✅ |
| PUT | `/api/attendance/:id` | Update attendance | ✅ |
| DELETE | `/api/attendance/:id` | Delete attendance | ✅ |
| GET | `/api/attendance/summary` | Monthly summary | ✅ |

### Workflow Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/attendance/:id/submit` | Submit for approval | ✅ |
| POST | `/api/attendance/:id/approve` | Approve attendance | ✅ |
| POST | `/api/attendance/:id/reject` | Reject attendance | ✅ |
| POST | `/api/attendance/:id/mark-paid` | Mark as paid | ✅ |

### Worker/Labour Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/labour` | List workers | ✅ |
| POST | `/api/labour` | Create worker | ✅ |
| GET | `/api/labour/:id` | Get worker details | ✅ |
| PUT | `/api/labour/:id` | Update worker | ✅ |
| DELETE | `/api/labour/:id` | Delete worker | ✅ |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/payments` | List payments | ✅ |
| POST | `/api/payments` | Create payment | ✅ |
| GET | `/api/payments/:id` | Get payment | ✅ |
| PUT | `/api/payments/:id` | Update payment | ✅ |
| DELETE | `/api/payments/:id` | Delete payment | ✅ |

### Export Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/export/attendance` | Export attendance CSV | ✅ |
| GET | `/api/export/payments` | Export payments CSV | ✅ |
| GET | `/api/export/monthly-wages` | Export monthly wages | ✅ |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard` | Get metrics | ✅ |

### Site & Project Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/sites` | List sites | ✅ |
| POST | `/api/sites` | Create site | ✅ |
| GET | `/api/projects` | List projects | ✅ |
| POST | `/api/projects` | Create project | ✅ |
| GET | `/api/customers` | List customers | ✅ |
| POST | `/api/customers` | Create customer | ✅ |

### Example API Requests

#### Login Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supervisor@labourcrm.com",
    "password": "supervisor123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "name": "Supervisor User",
    "email": "supervisor@labourcrm.com",
    "role": "supervisor"
  }
}
```

#### Mark Attendance Request
```bash
curl -X POST http://localhost:3000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "labour_id": 1,
    "project_id": 1,
    "attendance_date": "2026-01-12",
    "in_time": "09:00",
    "out_time": "18:00",
    "attendance_status": "present",
    "work_details": {
      "description": "Foundation work",
      "area": "Block A",
      "units": "100 sq.m"
    }
  }'
```

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🗄️ Database Schema

The system uses SQLite by default (can be migrated to MySQL/PostgreSQL).

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'supervisor',
  phone VARCHAR(20),
  joining_date DATE,
  last_login DATETIME,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Attendance Table
```sql
CREATE TABLE attendances (
  attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
  labour_id INTEGER NOT NULL,
  project_id INTEGER,
  attendance_date DATE NOT NULL,
  in_time TIME,
  out_time TIME,
  total_hours DECIMAL(5,2),
  ot_hours DECIMAL(5,2),
  attendance_status VARCHAR(20) DEFAULT 'present',
  amount DECIMAL(10,2),
  work_details TEXT,
  material_details TEXT,
  materials_cost DECIMAL(10,2),
  workflow_status VARCHAR(20) DEFAULT 'draft',
  payment_status VARCHAR(20) DEFAULT 'pending',
  approved_by INTEGER,
  approved_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (labour_id) REFERENCES workers(worker_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);
```

#### Workers Table
```sql
CREATE TABLE workers (
  worker_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(20),
  work_type VARCHAR(50),
  wage_per_day DECIMAL(10,2),
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Payments Table
```sql
CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  attendance_id INTEGER NOT NULL,
  labour_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_mode VARCHAR(20),
  payment_date DATE,
  payment_status VARCHAR(20) DEFAULT 'pending',
  transaction_ref VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attendance_id) REFERENCES attendances(attendance_id),
  FOREIGN KEY (labour_id) REFERENCES workers(worker_id)
);
```

### Relationships
- **User → Attendance**: One user approves many attendance records
- **Worker → Attendance**: One worker has many attendance records
- **Project → Attendance**: One project has many attendance records
- **Attendance → Payment**: One attendance can have multiple payments

---

## 👥 User Roles & Permissions

### Role Hierarchy

| Role | Access Level | Permissions |
|------|--------------|-------------|
| **Admin** | Full Access | All operations, user management, system settings |
| **Manager** | High Access | Approve attendance, manage payments, view reports |
| **Supervisor** | Medium Access | Mark attendance, submit for approval, view own records |
| **Accounts** | Financial Access | Manage payments, generate financial reports |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```properties
# ================================
# Server Configuration
# ================================
PORT=3000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000

# ================================
# JWT Configuration
# ================================
JWT_SECRET=your_super_secure_secret_key_minimum_32_characters_long
JWT_EXPIRE=24h

# ================================
# Database Configuration (SQLite - Default)
# ================================
# SQLite file is created automatically at backend/database.sqlite
# No configuration needed for SQLite

# ================================
# MySQL/PostgreSQL Configuration (Optional)
# ================================
# Uncomment and configure if using MySQL/PostgreSQL
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=labour_crm
# DB_DIALECT=mysql
# DB_POOL_MAX=10
# DB_POOL_MIN=2

# ================================
# Email Configuration (Optional)
# ================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@labourcrm.com

# ================================
# SMS Configuration (Optional)
# ================================
SMS_API_KEY=your_sms_api_key
SMS_SENDER_ID=LABOURCRM
SMS_API_URL=https://api.sms-provider.com/send
```

### PM2 Configuration (ecosystem.config.js)

```javascript
module.exports = {
  apps: [{
    name: 'labour-crm-api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

---

## 🚀 Deployment

### Deployment Options

#### 1. Traditional Hosting (VPS/Dedicated Server)

**Step 1: Prepare Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

**Step 2: Upload Application**
```bash
# Upload files to server (use SCP, FTP, or Git)
git clone <your-repo> /var/www/labour-crm
cd /var/www/labour-crm/backend
npm install --production
```

**Step 3: Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend static files
    location / {
        root /var/www/labour-crm;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 4: Start Application**
```bash
cd /var/www/labour-crm/backend
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### 2. Hostinger Deployment

See [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) for detailed instructions.

#### 3. GitHub Pages (Frontend Only)

The `docs/` folder is configured for GitHub Pages deployment:

1. Push code to GitHub
2. Go to Settings → Pages
3. Select `main` branch and `/docs` folder
4. Your site will be live at `https://username.github.io/repo-name`

**Note**: You'll need to deploy the backend separately and update API URLs.

---

## 🧪 Testing

### Manual Testing

1. **Start Server**: `npm start`
2. **Open Test Page**: http://localhost:3000/test-backend.html
3. **Test Endpoints**: Click buttons to test each API endpoint

### API Testing with cURL

```bash
# Test server health
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"supervisor@labourcrm.com","password":"supervisor123"}'

# Get attendance (with token)
curl http://localhost:3000/api/attendance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Testing Tools
- **Postman**: Import API collection (coming soon)
- **Thunder Client**: VS Code extension
- **Insomnia**: REST client
- Built-in test page: `test-backend.html`

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Standards
- Follow existing code style
- Add comments for complex logic
- Update documentation
- Test before submitting

### Reporting Issues
- Use GitHub Issues
- Provide detailed description
- Include steps to reproduce
- Attach screenshots if applicable

---

## 📄 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2026 Labour Management CRM

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 🆘 Support & Documentation

### Documentation Files
- 📖 [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- 🚀 [Quick Start Guide](QUICKSTART.md) - 5-minute setup
- ✅ [Features Checklist](FEATURES_CHECKLIST.md) - Feature completion status
- 🔧 [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- 📦 [Backend Guide](BACKEND_IMPLEMENTATION_GUIDE.md) - Backend development guide
- 🎨 [Frontend Checklist](FRONTEND_FILES_CHECKLIST.md) - Frontend files overview
- 🌐 [Deployment Guide](HOSTINGER_DEPLOYMENT_GUIDE.md) - Hostinger deployment
- 📝 [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Project summary

### Get Help
- 📧 **Email**: support@labourcrm.com
- 💬 **Issues**: GitHub Issues
- 📚 **Wiki**: Project Wiki

---

## 🎯 Roadmap

### v1.1 (Planned)
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with charts
- [ ] Email notifications
- [ ] SMS alerts for attendance
- [ ] Biometric attendance integration
- [ ] Multi-language support

### v1.2 (Future)
- [ ] Role-based dashboards
- [ ] Custom report builder
- [ ] Backup & restore functionality
- [ ] Audit log viewer
- [ ] Advanced search and filters
- [ ] Bulk operations

---

## 💡 Tips & Best Practices

### Performance
- Use pagination for large datasets
- Implement caching for frequently accessed data
- Optimize database queries
- Use CDN for static assets

### Security
- Never commit `.env` file
- Use strong JWT secrets
- Implement rate limiting
- Regular security updates
- Input validation on both frontend and backend

### Development
- Use `npm run dev` for auto-reload during development
- Check `backend/database.sqlite` for data persistence
- Use browser DevTools for debugging
- Test API endpoints before frontend integration

---

## 🙏 Acknowledgments

- Built with ❤️ for construction and labour management industries
- Inspired by modern CRM systems like Zoho CRM
- Icons from Font Awesome and custom SVGs
- Community contributions and feedback

---

## 📞 Contact

**Project Maintainer**: Labour CRM Team  
**Email**: info@labourcrm.com  
**GitHub**: https://github.com/yourusername/labour-crm

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the Labour CRM Team

[Report Bug](https://github.com/yourusername/labour-crm/issues) · [Request Feature](https://github.com/yourusername/labour-crm/issues) · [Documentation](API_DOCUMENTATION.md)

</div>
| GET | `/api/export/monthly-wages` | Export monthly wages | ✅ |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard` | Get metrics | ✅ |

### Site & Project Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/sites` | List sites | ✅ |
| POST | `/api/sites` | Create site | ✅ |
| GET | `/api/projects` | List projects | ✅ |
| POST | `/api/projects` | Create project | ✅ |
| GET | `/api/customers` | List customers | ✅ |
| POST | `/api/customers` | Create customer | ✅ |

### Example API Requests

#### Login Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supervisor@labourcrm.com",
    "password": "supervisor123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "name": "Supervisor User",
    "email": "supervisor@labourcrm.com",
    "role": "supervisor"
  }
}
```

#### Mark Attendance Request
```bash
curl -X POST http://localhost:3000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "labour_id": 1,
    "project_id": 1,
    "attendance_date": "2026-01-12",
    "in_time": "09:00",
    "out_time": "18:00",
    "attendance_status": "present",
    "work_details": {
      "description": "Foundation work",
      "area": "Block A",
      "units": "100 sq.m"
    }
  }'
```

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🗄️ Database Schema

The system uses SQLite by default (can be migrated to MySQL/PostgreSQL).

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'supervisor',
  phone VARCHAR(20),
  joining_date DATE,
  last_login DATETIME,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Attendance Table
```sql
CREATE TABLE attendances (
  attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
  labour_id INTEGER NOT NULL,
  project_id INTEGER,
  attendance_date DATE NOT NULL,
  in_time TIME,
  out_time TIME,
  total_hours DECIMAL(5,2),
  ot_hours DECIMAL(5,2),
  attendance_status VARCHAR(20) DEFAULT 'present',
  amount DECIMAL(10,2),
  work_details TEXT,
  material_details TEXT,
  materials_cost DECIMAL(10,2),
  workflow_status VARCHAR(20) DEFAULT 'draft',
  payment_status VARCHAR(20) DEFAULT 'pending',
  approved_by INTEGER,
  approved_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (labour_id) REFERENCES workers(worker_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);
```

#### Workers Table
```sql
CREATE TABLE workers (
  worker_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(20),
  work_type VARCHAR(50),
  wage_per_day DECIMAL(10,2),
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Payments Table
```sql
CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  attendance_id INTEGER NOT NULL,
  labour_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_mode VARCHAR(20),
  payment_date DATE,
  payment_status VARCHAR(20) DEFAULT 'pending',
  transaction_ref VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attendance_id) REFERENCES attendances(attendance_id),
  FOREIGN KEY (labour_id) REFERENCES workers(worker_id)
);
```

### Relationships
- **User → Attendance**: One user approves many attendance records
- **Worker → Attendance**: One worker has many attendance records
- **Project → Attendance**: One project has many attendance records
- **Attendance → Payment**: One attendance can have multiple payments

---

## 👥 User Roles & Permissions

### Role Hierarchy

| Role | Access Level | Permissions |
|------|--------------|-------------|
| **Admin** | Full Access | All operations, user management, system settings |
| **Manager** | High Access | Approve attendance, manage payments, view reports |
| **Supervisor** | Medium Access | Mark attendance, submit for approval, view own records |
| **Accounts** | Financial Access | Manage payments, generate financial reports |

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@labourcrm.com | admin123 |
| 👷 Manager | manager@labourcrm.com | manager123 |
| ⚙️ Supervisor | supervisor@labourcrm.com | supervisor123 |
| 💰 Accounts | accounts@labourcrm.com | accounts123 |

---

## 📱 Application Pages

### 🔐 Authentication
- **login.html** - Login & Registration page

### 📊 Dashboard & Analytics
- **dashboard.html** - Main dashboard with metrics
- **dashboard-calc.html** - Advanced dashboard calculations
- **reports.html** - Comprehensive reports

### 👷 Workforce Management
- **workers.html** - Worker/labour master management
- **contractors.html** - Contractor management
- **attendance.html** - Attendance marking and tracking
- **attendance-format.html** - Attendance format templates

### 💰 Financial
- **payments.html** - Payment tracking and processing
- **project-cost.html** - Project cost management

### 🏗️ Projects & Sites
- **projects.html** - Project management
- **sites.html** - Site/location management

### ⚙️ Settings
- **profile.html** - User profile management
- **settings.html** - System settings

### 🧪 Testing
- **test-backend.html** - API testing interface

---

## ⚙️ Configuration

### Environment Variables (.env)

```properties
# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=labour_crm
DB_POOL_MAX=10
DB_POOL_MIN=2

# JWT
JWT_SECRET=your_secret_key_minimum_32_characters
JWT_EXPIRE=24h

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password

# SMS (Optional)
SMS_API_KEY=your_api_key
SMS_SENDER_ID=LABOURCRM

# Timezone
TZ=Asia/Kolkata
```

## 📊 Workflow States

The attendance workflow follows these states:

```
┌─────────┐
│ DRAFT   │ (Created)
└────┬────┘
     │ Submit for Approval
     ↓
┌────────────┐
│ SUBMITTED  │ (Pending Approval)
└───┬────┬───┘
    │    │
    │ Approve
    │    ├─→ ┌──────────┐
    │       │ APPROVED │
    │       └────┬─────┘
    │            │ Mark as Paid
    │            └─→ ┌────────┐
    │                │ PAID   │
    │                └────────┘
    │
    │ Reject
    └──→ ┌──────────┐
         │ REJECTED │
         └──────────┘
```

## 🧮 Auto-Calculations

### Total Hours
```
total_hours = (out_time - in_time) in hours
```

### Overtime Hours
```
if total_hours > 8:
  ot_hours = total_hours - 8
else:
  ot_hours = 0
```

### Amount Calculation
```
amount = (wage_per_day) + (ot_hours × (wage_per_day/8) × 1.5)
Example: wage=500, ot_hours=2
amount = 500 + (2 × (500/8) × 1.5) = 500 + 187.5 = 687.5
```

## 📈 Reports Available

1. **Daily Attendance Summary**
   - Total workers present
   - Total hours worked
   - OT hours summary
   - Daily wages summary

2. **Monthly Wage Reports**
   - Worker-wise monthly wages
   - Total working days
   - Total OT hours
   - Monthly earnings

3. **Contractor Performance**
   - Sites managed
   - Active workers
   - Performance metrics
   - Payment status

4. **Payment Status**
   - Pending payments
   - Approved payments
   - Paid payments
   - Payment modes

## 🔄 Data Flow

```
Worker Marks Attendance
        ↓
System Creates Record (DRAFT)
        ↓
Supervisor Submits (SUBMITTED)
        ↓
Manager Approves (APPROVED)
        ↓
Accounts Mark Paid (PAID)
        ↓
Payment Record Created
        ↓
Wage Transfer
```

## 🛡️ Security Features

- **Password Security**: Bcrypt hashing with salt
- **JWT Tokens**: Stateless authentication
- **Protected Routes**: All sensitive pages require login
- **Input Validation**: Server-side validation
- **CORS**: Configured for secure cross-origin requests
- **Rate Limiting**: (Ready to implement)
- **SQL Injection Prevention**: Sequelize ORM with parameterized queries
- **XSS Protection**: Input sanitization

## 🚀 Deployment

### Heroku Deployment
```bash
# Create Heroku app
heroku create labour-crm

# Add MySQL database
heroku addons:create cleardb:ignite

# Push code
git push heroku main

# Run migrations
heroku run npm run migrate
```

### Docker Deployment
```bash
# Build image
docker build -t labour-crm .

# Run container
docker run -p 3000:3000 labour-crm
```

## 📝 Data Import

Sample data is seeded automatically:
- 4 demo users (different roles)
- 10 projects/sites
- 100 contractors
- Sample attendance records

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running. Check credentials in .env

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Run `npm start -- --port 3001` or kill existing process

### JWT Token Invalid
```
Error: Not authorized to access this route
```
**Solution**: Clear localStorage and login again

### CORS Error
```
Error: Access blocked by CORS policy
```
**Solution**: Check FRONTEND_URL in .env matches your domain

## 📚 File Structure

```
Labour_Management_CRM_UI/
├── login.html                 # Authentication page
├── dashboard.html             # Main dashboard
├── attendance.html            # Attendance management
├── workers.html               # Worker management
├── contractors.html           # Contractor management
├── sites.html                 # Site management
├── payments.html              # Payment tracking
├── reports.html               # Reports & analytics
├── profile.html               # User profile
├── settings.html              # Settings & security
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   └── auth.js                # Authentication utilities
├── backend/
│   ├── server.js              # Express server
│   ├── package.json           # Dependencies
│   ├── .env.example           # Configuration template
│   ├── config/
│   │   └── database.js        # Database config
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Worker.js          # Worker model
│   │   ├── Project.js         # Project model
│   │   ├── Attendance.js      # Attendance model
│   │   └── Payment.js         # Payment model
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── attendance.controller.js
│   │   ├── payment.controller.js
│   │   └── export.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── attendance.routes.js
│   │   ├── export.routes.js
│   │   └── ...
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── seeders/
│   │   └── seed-users.js      # Demo data seeding
│   └── migrations/
│       └── 001-create-schema.sql
├── API_DOCUMENTATION.md       # API reference
├── SETUP_GUIDE.md            # Setup instructions
└── README.md                 # This file
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Email: support@labourcrm.com
- Check documentation files

## 🙏 Acknowledgments

- Built with Node.js & Express
- Database: MySQL & Sequelize ORM
- Frontend: HTML5, CSS3, JavaScript
- Icons: Font Awesome 6

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics & dashboards
- [ ] SMS/Email notifications
- [ ] Geo-location tracking
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Real-time updates (WebSocket)
- [ ] Offline mode
- [ ] Advanced search & filtering

## 📊 Statistics

- **Lines of Code**: 5000+
- **Database Tables**: 6
- **API Endpoints**: 40+
- **Frontend Pages**: 10
- **User Roles**: 4
- **Workflow States**: 5

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
