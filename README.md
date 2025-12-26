# 🏗️ Labour Management CRM - Complete Production System

A comprehensive Labour Attendance Management System built with Node.js, Express, MySQL, and HTML5. Inspired by Zoho CRM with professional workflows, auto-calculations, and complete reporting capabilities.

## 📋 Features

### ✅ Complete Feature Set
- **User Authentication**: Secure login/register with JWT tokens
- **Role-Based Access Control**: Admin, Manager, Supervisor, Accounts roles
- **Attendance Management**: Mark attendance with work & material tracking
- **Workflow Management**: Draft → Submitted → Approved → Rejected → Paid
- **Auto-Calculations**: Total hours, OT hours (1.5x multiplier), wage calculations
- **Payment Tracking**: Complete payment workflow with approval status
- **Data Export**: CSV export for attendance, payments, and reports
- **User Profiles**: Profile management with password change
- **Dashboard Analytics**: Real-time metrics and statistics
- **Material Tracking**: Track work details and material costs per day
- **Multi-User Support**: Team collaboration with role-based features

### 🎨 User Interface
- Premium gradient-based design
- Responsive dashboard
- Intuitive navigation
- Real-time status updates
- Confirmation dialogs for critical actions
- Toast notifications
- Clean, professional styling

### 🔒 Security
- Password hashing with bcrypt
- JWT token authentication
- Protected routes and APIs
- Input validation
- Role-based authorization middleware

### 📊 Reporting
- Daily attendance summary
- Monthly wage reports
- Payment status reports
- Contractor performance analytics
- Project-wise attendance tracking

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### Installation

1. **Clone & Navigate**
```bash
cd Labour_Management_CRM_UI
cd backend
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=labour_crm
JWT_SECRET=your_secret_key_here
PORT=3000
```

3. **Run the Server**
```bash
npm start
```

Server will start at `http://localhost:3000`

## 📱 Pages & Features

### Authentication
- **Login Page** (`login.html`)
  - Email & password login
  - New account registration
  - Demo credentials for testing
  - Role selection (Admin, Manager, Supervisor, Accounts)

### Dashboard
- **Dashboard** (`dashboard.html`)
  - Overview metrics (Active members, Income, etc.)
  - Clickable cards for navigation
  - User profile menu
  - Premium gradient design

### Core Features
- **Attendance** (`attendance.html`)
  - Mark daily attendance
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
```
POST   /api/auth/register        - Create new account
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user (Protected)
PUT    /api/auth/profile         - Update profile (Protected)
POST   /api/auth/change-password - Change password (Protected)
```

### Attendance Endpoints
```
POST   /api/attendance/mark      - Create attendance record
GET    /api/attendance           - List attendance records
GET    /api/attendance/summary   - Get monthly summary
PUT    /api/attendance/:id       - Update attendance
POST   /api/attendance/:id/submit    - Submit for approval
POST   /api/attendance/:id/approve   - Approve attendance
POST   /api/attendance/:id/reject    - Reject attendance
POST   /api/attendance/:id/mark-paid - Mark as paid
```

### Export Endpoints
```
GET    /api/export/attendance    - Export attendance CSV
GET    /api/export/payments      - Export payments CSV
GET    /api/export/daily-summary - Export daily summary
GET    /api/export/monthly-wages - Export monthly wages
```

### Example Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supervisor@labourcrm.com",
    "password": "supervisor123"
  }'
```

## 💾 Database Setup

The database will auto-create on first run. To manually create the schema:

```bash
# Import the migration script
mysql -u root -p labour_crm < backend/migrations/001-create-schema.sql
```

### Database Tables
- `users` - User accounts and authentication
- `workers` - Labour master data
- `projects` - Project/site information
- `attendances` - Daily attendance records with workflow status
- `payments` - Payment tracking
- `audit_logs` - Activity logging

## 🔧 Configuration

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
