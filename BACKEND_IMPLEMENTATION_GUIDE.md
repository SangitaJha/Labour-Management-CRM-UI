# Backend Implementation Guide
## Transform Your CRM into Zoho/Salesforce-like System

---

## 🎯 ARCHITECTURE OVERVIEW

Your CRM needs 3 main components:
1. **Frontend** (Already Done) - HTML/CSS/JS Dashboard
2. **Backend API** (To Build) - Node.js/Python/PHP Server
3. **Database** (To Setup) - MySQL/PostgreSQL/MongoDB

---

## 📊 RECOMMENDED TECH STACK

### Option 1: Node.js Stack (Most Popular)
- **Backend**: Node.js + Express.js
- **Database**: MySQL or PostgreSQL
- **ORM**: Sequelize or Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Email**: Nodemailer

### Option 2: Python Stack (Best for Data Analytics)
- **Backend**: Python + Flask/Django
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy (Flask) or Django ORM
- **Authentication**: Flask-JWT or Django REST Framework
- **Task Queue**: Celery (for background jobs)

### Option 3: PHP Stack (Traditional)
- **Backend**: PHP + Laravel
- **Database**: MySQL
- **ORM**: Eloquent (Laravel)
- **Authentication**: Laravel Passport/Sanctum

**Recommendation**: Use **Node.js + Express + MySQL** (easiest to learn, most resources available)

---

## 🗄️ DATABASE DESIGN

### Core Tables Required:

```sql
-- Users & Authentication
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'manager', 'agent') DEFAULT 'agent',
    full_name VARCHAR(100),
    mobile VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(200) NOT NULL,
    location VARCHAR(255),
    total_plots INT DEFAULT 0,
    vacant_plots INT DEFAULT 0,
    booked_plots INT DEFAULT 0,
    project_value DECIMAL(15,2),
    start_date DATE,
    end_date DATE,
    status ENUM('planning', 'ongoing', 'completed', 'on_hold') DEFAULT 'planning',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Customers
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_code VARCHAR(20) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobile VARCHAR(20) NOT NULL,
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    agent_id INT,
    customer_type ENUM('individual', 'corporate') DEFAULT 'individual',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

-- Sales / Bookings
CREATE TABLE sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sale_code VARCHAR(20) UNIQUE,
    customer_id INT NOT NULL,
    project_id INT NOT NULL,
    plot_number VARCHAR(50),
    sale_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2),
    sale_date DATE NOT NULL,
    booking_status ENUM('booked', 'paid', 'cancelled') DEFAULT 'booked',
    agent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

-- Agents (extends users)
CREATE TABLE agents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    agent_code VARCHAR(20) UNIQUE,
    sponsor_id INT,
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    total_sales INT DEFAULT 0,
    total_commission DECIMAL(15,2) DEFAULT 0,
    joined_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sponsor_id) REFERENCES agents(id)
);

-- Vendors
CREATE TABLE vendors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_code VARCHAR(20) UNIQUE,
    vendor_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    mobile VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    vendor_type VARCHAR(50),
    gst_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contractors / Labour
CREATE TABLE contractors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contractor_code VARCHAR(20) UNIQUE,
    contractor_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(20),
    email VARCHAR(100),
    specialty VARCHAR(100),
    daily_rate DECIMAL(10,2),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders
CREATE TABLE purchase_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    po_number VARCHAR(20) UNIQUE,
    vendor_id INT NOT NULL,
    project_id INT,
    order_date DATE NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    status ENUM('pending', 'approved', 'completed', 'cancelled') DEFAULT 'pending',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Purchase Requisitions
CREATE TABLE purchase_requisitions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    requisition_number VARCHAR(20) UNIQUE,
    project_id INT,
    requested_by INT,
    request_date DATE NOT NULL,
    required_date DATE,
    status ENUM('pending', 'approved', 'rejected', 'converted_to_po') DEFAULT 'pending',
    total_amount DECIMAL(15,2),
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (requested_by) REFERENCES users(id)
);

-- Income Heads
CREATE TABLE income_heads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    head_name VARCHAR(100) NOT NULL,
    head_type VARCHAR(50),
    initial_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expense Heads
CREATE TABLE expense_heads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    head_name VARCHAR(100) NOT NULL,
    head_type VARCHAR(50),
    initial_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions (Income)
CREATE TABLE income_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_number VARCHAR(20) UNIQUE,
    income_head_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    payment_method ENUM('cash', 'bank', 'cheque', 'online') DEFAULT 'cash',
    reference_number VARCHAR(50),
    description TEXT,
    customer_id INT,
    project_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (income_head_id) REFERENCES income_heads(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Transactions (Expense)
CREATE TABLE expense_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_number VARCHAR(20) UNIQUE,
    expense_head_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    payment_method ENUM('cash', 'bank', 'cheque', 'online') DEFAULT 'cash',
    reference_number VARCHAR(50),
    description TEXT,
    vendor_id INT,
    project_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expense_head_id) REFERENCES expense_heads(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Bank Accounts
CREATE TABLE bank_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) UNIQUE,
    bank_name VARCHAR(100),
    branch_name VARCHAR(100),
    ifsc_code VARCHAR(20),
    account_type ENUM('savings', 'current') DEFAULT 'current',
    opening_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cash Accounts
CREATE TABLE cash_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(100) NOT NULL,
    opening_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs (Audit Trail)
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL,
    record_id INT,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🔧 API ENDPOINTS STRUCTURE

### Authentication APIs
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
GET    /api/auth/profile           - Get current user profile
PUT    /api/auth/profile           - Update profile
POST   /api/auth/change-password   - Change password
```

### Dashboard APIs
```
GET    /api/dashboard/stats        - Get all dashboard statistics
GET    /api/dashboard/new-agents   - Get new agents list
GET    /api/dashboard/new-customers - Get new customers list
```

### CRM Module APIs
```
GET    /api/customers              - Get all customers
GET    /api/customers/:id          - Get single customer
POST   /api/customers              - Create new customer
PUT    /api/customers/:id          - Update customer
DELETE /api/customers/:id          - Delete customer
GET    /api/customers/search       - Search customers
```

### Project Module APIs
```
GET    /api/projects               - Get all projects
GET    /api/projects/:id           - Get single project
POST   /api/projects               - Create new project
PUT    /api/projects/:id           - Update project
DELETE /api/projects/:id           - Delete project
GET    /api/projects/:id/plots     - Get project plots
```

### Sales Module APIs
```
GET    /api/sales                  - Get all sales
GET    /api/sales/:id              - Get single sale
POST   /api/sales                  - Create new sale
PUT    /api/sales/:id              - Update sale
DELETE /api/sales/:id              - Cancel sale
GET    /api/sales/reports          - Sales reports
```

### Vendor Module APIs
```
GET    /api/vendors                - Get all vendors
POST   /api/vendors                - Create vendor
PUT    /api/vendors/:id            - Update vendor
DELETE /api/vendors/:id            - Delete vendor
```

### Purchase Module APIs
```
GET    /api/purchase-requisitions  - Get requisitions
POST   /api/purchase-requisitions  - Create requisition
PUT    /api/purchase-requisitions/:id - Update requisition
GET    /api/purchase-orders        - Get purchase orders
POST   /api/purchase-orders        - Create PO
```

### Accounting Module APIs
```
GET    /api/income-heads           - Get income heads
POST   /api/income-heads           - Create income head
GET    /api/expense-heads          - Get expense heads
POST   /api/expense-heads          - Create expense head
GET    /api/transactions/income    - Get income transactions
POST   /api/transactions/income    - Record income
GET    /api/transactions/expense   - Get expense transactions
POST   /api/transactions/expense   - Record expense
GET    /api/bank-accounts          - Get bank accounts
GET    /api/cash-accounts          - Get cash accounts
```

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### Phase 1: Setup Backend (Week 1-2)

1. **Install Node.js & MySQL**
   ```bash
   # Download Node.js from nodejs.org
   # Install MySQL from mysql.com
   ```

2. **Create Project Structure**
   ```bash
   mkdir crm-backend
   cd crm-backend
   npm init -y
   ```

3. **Install Dependencies**
   ```bash
   npm install express mysql2 sequelize bcryptjs jsonwebtoken cors dotenv
   npm install nodemon --save-dev
   ```

4. **Create Database**
   ```sql
   CREATE DATABASE real_estate_crm;
   USE real_estate_crm;
   -- Run all CREATE TABLE queries
   ```

### Phase 2: Build Authentication (Week 2)

- User registration with password hashing
- Login with JWT token generation
- Middleware for protected routes
- Role-based access control

### Phase 3: Build Core Modules (Week 3-6)

- Dashboard statistics API
- Customer management CRUD
- Project management CRUD
- Sales/Booking system
- Agent management
- Vendor management

### Phase 4: Build Advanced Modules (Week 7-10)

- Purchase requisition workflow
- Purchase order management
- Income/Expense tracking
- Bank & Cash management
- Reports generation

### Phase 5: Frontend Integration (Week 11-12)

- Replace static data with API calls
- Add forms for CRUD operations
- Implement data tables with pagination
- Add search & filter functionality

### Phase 6: Advanced Features (Week 13-16)

- File upload (documents, photos)
- Email notifications
- SMS integration
- PDF generation for invoices
- Excel export for reports
- Dashboard charts (Chart.js)
- Real-time updates (Socket.io)

---

## 💻 SAMPLE BACKEND CODE

See the following files I'll create:
- `server.js` - Main server file
- `config/database.js` - Database configuration
- `routes/` - API route handlers
- `controllers/` - Business logic
- `models/` - Database models
- `middleware/` - Authentication & validation

---

## 📱 MAKING IT LIKE ZOHO/SALESFORCE

### Key Features to Implement:

1. **Multi-tenancy** - Multiple organizations
2. **Custom Fields** - Let users add custom fields
3. **Workflows** - Automated actions based on triggers
4. **Email Templates** - Customizable email templates
5. **Reports Builder** - Custom report generation
6. **Dashboard Widgets** - Customizable dashboards
7. **Mobile App** - React Native or Flutter
8. **API Documentation** - Swagger/OpenAPI
9. **Data Import/Export** - CSV, Excel support
10. **Integrations** - Third-party APIs (WhatsApp, SMS, Email)

---

## 🔐 SECURITY BEST PRACTICES

- Hash passwords with bcrypt (10+ rounds)
- Use JWT with expiration (1 hour)
- Implement refresh tokens
- SQL injection prevention (use parameterized queries)
- XSS protection (sanitize inputs)
- CORS configuration
- Rate limiting (express-rate-limit)
- HTTPS in production
- Environment variables for secrets
- Regular security audits

---

## 📈 SCALABILITY TIPS

- Use connection pooling for database
- Implement caching (Redis)
- Load balancing (PM2, Nginx)
- CDN for static assets
- Database indexing on foreign keys
- Pagination for large datasets
- Background jobs for heavy tasks
- Microservices architecture (later)

---

## 🎓 LEARNING RESOURCES

**Node.js & Express:**
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

**Database:**
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [Sequelize ORM](https://sequelize.org/)

**Authentication:**
- [JWT.io](https://jwt.io/)
- [Passport.js](http://www.passportjs.org/)

**Complete Course:**
- YouTube: "Node.js REST API with MySQL"
- Udemy: "Complete Node.js Developer"

---

## 📞 NEXT STEPS

Would you like me to create:
1. ✅ Complete backend project structure
2. ✅ Sample API endpoints with code
3. ✅ Database connection setup
4. ✅ Authentication system
5. ✅ Frontend integration examples

Let me know which part you want to start with!
