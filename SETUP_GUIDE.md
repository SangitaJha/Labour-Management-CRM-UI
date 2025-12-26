# Labour Attendance Management System
## Complete CRM Solution for Construction/Labour Management

---

## 📋 Project Overview

A comprehensive Labour Attendance Management System built with **Node.js/Express** backend and **HTML/CSS/JS** frontend, implementing Zoho CRM-inspired workflow management (Draft → Submitted → Approved → Paid).

### Key Features
✅ **Attendance Tracking** - Daily in/out time capture with geo-location support  
✅ **Auto-Calculations** - Total hours, OT hours, wage calculation with OT at 1.5x  
✅ **Work & Material Tracking** - Daily work details and material costs per labour  
✅ **CRM Workflow** - Draft → Submitted → Approved → Rejected → Paid  
✅ **Payment Management** - Multiple payment modes (Cash, Bank, UPI)  
✅ **Reports & Analytics** - Daily, monthly, contractor-wise reports  
✅ **Multi-site Management** - Manage 10+ construction sites simultaneously  
✅ **Contractor & Worker Management** - Complete labour master with 10 work types

---

## 🗂️ Project Structure

```
Labour_Management_CRM_UI/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── attendance.controller.js
│   │   ├── worker.controller.js
│   │   ├── project.controller.js
│   │   └── ...
│   ├── models/
│   │   ├── Attendance.js
│   │   ├── Worker.js
│   │   ├── Project.js
│   │   ├── Payment.js
│   │   └── ...
│   ├── routes/
│   │   ├── attendance.routes.js
│   │   ├── worker.routes.js
│   │   └── ...
│   ├── migrations/
│   │   └── 001-create-schema.sql
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── css/
│   └── style.css
├── dashboard.html
├── attendance.html
├── contractors.html
├── sites.html
├── workers.html
├── payments.html
├── reports.html
├── projects.html
├── API_DOCUMENTATION.md
└── README.md
```

---

## 📊 Database Schema

### Tables
1. **Projects** - Site/project information
2. **Workers** - Labour master (Labour ID, name, work type, wage)
3. **Attendances** - Daily attendance with workflow status
4. **Payments** - Payment tracking per attendance

### Views
- `v_daily_attendance` - Daily attendance report
- `v_monthly_wages` - Monthly wage summary
- `v_pending_payments` - Pending payment tracking
- `v_contractor_summary` - Contractor performance

See [backend/migrations/001-create-schema.sql](backend/migrations/001-create-schema.sql) for complete DDL.

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** v14+ (Download: https://nodejs.org/)
- **MySQL** 5.7+ (Download: https://dev.mysql.com/downloads/mysql/)
- **Git** (Download: https://git-scm.com/)

### Step 1: Clone & Install Backend Dependencies
```bash
cd Labour_Management_CRM_UI/backend
npm install
```

### Step 2: Configure Database
1. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=labour_attendance_db
   ```

3. Create MySQL database:
   ```bash
   mysql -u root -p
   CREATE DATABASE labour_attendance_db;
   EXIT;
   ```

4. Run migrations:
   ```bash
   mysql -u root -p labour_attendance_db < migrations/001-create-schema.sql
   ```

### Step 3: Start Backend Server
```bash
cd backend
npm start
```

Expected output:
```
🚀 Server running on http://localhost:3000
📡 API available at http://localhost:3000/api
✅ Database connected successfully
```

### Step 4: Access Frontend
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📱 Frontend Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/dashboard.html` | Home page with metrics |
| Attendance | `/attendance.html` | Mark & manage attendance with workflow |
| Labour/Workers | `/workers.html` | Labour master management |
| Contractors | `/contractors.html` | Contractor details & statistics |
| Sites | `/sites.html` | Site management with contractor details |
| Payments | `/payments.html` | Payment tracking & processing |
| Reports | `/reports.html` | Attendance & wage reports |
| Projects | `/projects.html` | Project/site management |

---

## 🔄 Workflow (Blueprint)

### Attendance Workflow States
```
DRAFT (Initial State)
  ↓ [Submit Button]
SUBMITTED (Awaiting Approval)
  ↓ [Approve/Reject Buttons]
APPROVED (Ready for Payment) or REJECTED (Requires Correction)
  ↓ [Mark Paid Button]
PAID (Final State)
```

### Validation Rules
✅ **Mandatory Fields**
- Attendance Date
- Labour ID
- Project ID
- Attendance Status

✅ **Auto-Calculations**
- Total Hours: Calculated from in_time and out_time
- OT Hours: If total_hours > 8, OT = total_hours - 8
- Amount: wage_per_day + (ot_hours × (wage_per_day / 8) × 1.5)

✅ **Workflow Constraints**
- Only DRAFT can be SUBMITTED
- Only SUBMITTED can be APPROVED/REJECTED
- Only APPROVED can be marked PAID
- Cannot pay without approval

---

## 🔌 API Endpoints

### Attendance Management
```
POST   /api/attendance/mark           - Mark new attendance
GET    /api/attendance                - Get attendance records
GET    /api/attendance/summary        - Get attendance summary
PUT    /api/attendance/:id            - Update attendance
```

---

## 🚀 Deploying to Hostinger

You can deploy the static frontend on Hostinger shared hosting and the Node.js backend on Hostinger VPS/Cloud. Shared hosting plans generally do not support running persistent Node.js servers.

### Option A: Hostinger VPS/Cloud (Backend + Frontend on same domain)

1. Provision a VPS/Cloud instance on Hostinger (Ubuntu recommended).
2. SSH into the server and install Node.js, PM2, and Nginx:
   ```bash
   sudo apt update
   sudo apt install -y curl nginx
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm i -g pm2
   ```
3. Upload the project (SFTP or `git clone`) to `/var/www/labour-crm` (or your preferred path).
4. Configure environment:
   ```bash
   cd /var/www/labour-crm/backend
   cp .env.example .env
   nano .env  # Set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, FRONTEND_URL=https://yourdomain.com
   ```
5. Install dependencies and start with PM2:
   ```bash
   cd /var/www/labour-crm/backend
   npm ci
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup  # follow instructions to enable PM2 on boot
   ```
6. Configure Nginx to serve the frontend and proxy API to Node:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     root /var/www/labour-crm;  # project root containing dashboard.html, etc.
     index dashboard.html;

     location /api/ {
       proxy_pass http://127.0.0.1:3000/api/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

     location / {
       try_files $uri $uri/ /dashboard.html;
     }
   }
   ```
   Then enable and reload:
   ```bash
   sudo tee /etc/nginx/sites-available/labour-crm >/dev/null < /etc/nginx/sites-available/labour-crm
   sudo ln -s /etc/nginx/sites-available/labour-crm /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Option B: Hostinger Shared Hosting (Frontend only)

1. Upload all frontend files (HTML/CSS/JS) to `public_html/` using hPanel File Manager or FTP.
2. Ensure API calls point to your backend server. The frontend now uses the current origin automatically for API (`/api`). If your backend is on a different domain, update CORS `FRONTEND_URL` in `backend/.env` and set a full API base when needed.
3. Run the backend on a separate VPS (Hostinger VPS or any Node host) and expose `/api`. Set DNS or use the full URL in CORS.

### Database Setup on Hostinger

1. Create a MySQL database in hPanel and note the host, user, password, and DB name.
2. Set these in `backend/.env`.
3. Import schema:
   ```bash
   mysql -h <DB_HOST> -u <DB_USER> -p <DB_NAME> < backend/migrations/001-create-schema.sql
   ```
4. Start the backend and verify `GET /api/health` returns `OK`.

### Notes

- CORS: Set `FRONTEND_URL` in `.env` to your domain (e.g., `https://yourdomain.com`).
- Ports: The backend reads `PORT` from `.env` (default `3000`). Nginx proxies requests to this port.
- Auth & Demo: Use demo users from the seeder or register via `/api/auth/register`.

### Workflow Transitions
```
POST   /api/attendance/:id/submit     - Submit for approval (Draft → Submitted)
POST   /api/attendance/:id/approve    - Approve attendance (Submitted → Approved)
POST   /api/attendance/:id/reject     - Reject attendance (Submitted → Rejected)
POST   /api/attendance/:id/mark-paid  - Mark as paid (Approved → Paid)
```

### Workers Management
```
GET    /api/labour/workers            - Get all workers
POST   /api/labour/workers            - Create worker
PUT    /api/labour/workers/:id        - Update worker
DELETE /api/labour/workers/:id        - Delete worker
```

### Projects Management
```
GET    /api/projects                  - Get all projects
POST   /api/projects                  - Create project
PUT    /api/projects/:id              - Update project
DELETE /api/projects/:id              - Delete project
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API reference with cURL examples.

---

## 📊 Sample Data

**10 Sites** (Bangalore, Delhi, Mumbai, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Chandigarh + 1 more)

**100 Contractors** (10 types × 10 sites):
- Civil Work
- Centring Work
- Sand Filling
- Electrical Work
- Plumbing Work
- Carpentry Work
- Tiles Work
- Jally Work
- Grill Work
- Painting Work

**Work Type Details:**
- 2-3 workers per contractor
- Material costs (Cement, Brick, Steel, Wire, Pipe, etc.)
- Wage per day (₹400-₹700)

---

## 🎯 Key Features Explained

### 1. Attendance Page with Workflow
- **Mark Attendance** - Add daily attendance with work & material details
- **Work Details** - Track what work was done, where, and how much
- **Material Details** - Log materials used with costs
- **Workflow Status** - Visual indicators for approval stage
- **Action Buttons** - Submit, Approve, Reject, Mark Paid based on status

### 2. Auto-Calculations
- **Total Hours**: Calculated from in_time - out_time
- **OT Hours**: Auto-detected if hours > 8
- **Wage Calculation**: Base wage + OT at 1.5x multiplier
- **Total Payable**: Wage + Material Costs

Example:
```
In Time: 09:00 AM
Out Time: 06:00 PM
Total Hours: 9 hours
OT Hours: 1 hour (9 - 8)
Wage/Day: ₹500
OT Calculation: 1 × (500/8) × 1.5 = ₹93.75
Total Amount: ₹500 + ₹93.75 = ₹593.75
```

### 3. Sites Management
- Each site shows all 10 contractor types
- All contractors auto-expand on selection
- View worker details (name, role, in/out time, wage)
- View material details (name, qty, unit, cost)

### 4. Payment Tracking
- Track payment status (Pending, Partial, Paid)
- Multiple payment modes (Cash, Bank, UPI)
- Payment date and reference number
- Approve before payment processing

---

## 📈 Reports Available

### 1. Daily Attendance Report
- Date, Labour, Project, Status
- In/Out times, Total hours, OT hours
- Wage and payment status

### 2. Monthly Wages Report
- Labour-wise summary
- Present/Absent days
- Total wages, Material costs, Total payable
- Paid vs Pending amounts

### 3. Pending Payments Report
- All unpaid/partial payments
- Days pending count
- Labour details and amounts

### 4. Contractor Summary
- Total workers per contractor
- Working days, Present count
- Total wages and material costs

---

## 🔐 Security Features

✅ Workflow-based access control  
✅ Approval hierarchy (Supervisor → Manager → Accounts)  
✅ Geo-location tracking (optional)  
✅ Unique attendance record per labour per day  
✅ Validation rules enforcement  

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use strong JWT_SECRET
- [ ] Configure MySQL on production server
- [ ] Set up SSL certificates
- [ ] Configure CORS properly
- [ ] Set up logging and monitoring
- [ ] Create backups
- [ ] Test all workflows

### Deployment Commands
```bash
# Build (if applicable)
npm run build

# Start production server
NODE_ENV=production npm start

# With PM2 (recommended)
pm2 start server.js --name "labour-crm"
pm2 save
pm2 startup
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill existing process
lsof -i :3000
kill -9 <PID>

# Or change port in .env
PORT=3001
```

### Database Connection Error
```bash
# Verify MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check credentials in .env
# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

### Model Sync Errors
```bash
# Clear and recreate tables
mysql -u root -p labour_attendance_db < migrations/001-create-schema.sql
```

---

## 📧 Support & Documentation

- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Database Schema**: [backend/migrations/001-create-schema.sql](backend/migrations/001-create-schema.sql)
- **Environment Template**: [backend/.env.example](backend/.env.example)

---

## 📝 License

This project is proprietary and for internal use only.

---

## 👥 Contributors

- Backend: Node.js/Express/Sequelize
- Frontend: HTML5, CSS3, JavaScript
- Database: MySQL
- Design: Premium gradient-based UI

---

**Last Updated**: December 21, 2025  
**Version**: 1.0.0  
**Status**: Production Ready
