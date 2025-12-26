# Labour Attendance Management API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 1. ATTENDANCE ENDPOINTS

### 1.1 Mark Attendance
**POST** `/attendance/mark`

**Request Body:**
```json
{
  "project_id": 1,
  "labour_id": 1,
  "attendance_date": "2025-12-21",
  "in_time": "09:00",
  "out_time": "18:00",
  "attendance_status": "present",
  "ot_hours": 1,
  "work_details": {
    "description": "Foundation Laying",
    "area": "Main Block",
    "units": "100 sq.m",
    "remarks": "On schedule"
  },
  "material_details": [
    {
      "name": "Cement",
      "qty": "50",
      "unit": "bags",
      "cost": 1000
    },
    {
      "name": "M.Sand",
      "qty": "100",
      "unit": "cu.m",
      "cost": 800
    }
  ],
  "materials_cost": 1800,
  "geo_latitude": "12.9716",
  "geo_longitude": "77.5946",
  "remarks": "Work completed on time",
  "created_by": "Supervisor"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "attendance_id": 101,
    "labour_id": 1,
    "project_id": 1,
    "attendance_date": "2025-12-21",
    "in_time": "09:00",
    "out_time": "18:00",
    "total_hours": 9,
    "ot_hours": 1,
    "attendance_status": "present",
    "amount": 900,
    "materials_cost": 1800,
    "total_payable": 2700,
    "workflow_status": "draft",
    "payment_status": "pending",
    "created_at": "2025-12-21T10:30:00Z"
  }
}
```

---

### 1.2 Get Attendance Records
**GET** `/attendance?labour_id=1&start_date=2025-01-01&end_date=2025-12-31&attendance_status=present`

**Query Parameters:**
- `labour_id` (optional)
- `project_id` (optional)
- `start_date` (optional)
- `end_date` (optional)
- `attendance_status` (optional: present, absent, half_day, leave)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "attendance_id": 101,
      "labour_id": 1,
      "labour_name": "Ramesh",
      "project_id": 1,
      "project_name": "SVF Homes",
      "attendance_date": "2025-12-21",
      "in_time": "09:00",
      "out_time": "18:00",
      "total_hours": 9,
      "ot_hours": 1,
      "attendance_status": "present",
      "amount": 900,
      "wage_per_day": 800,
      "workflow_status": "draft",
      "payment_status": "pending"
    }
  ]
}
```

---

### 1.3 Get Attendance Summary (Per Labour, Per Month)
**GET** `/attendance/summary?start_date=2025-01-01&end_date=2025-12-31`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "labour_id": 1,
      "labour_name": "Ramesh",
      "total_days": 25,
      "present_days": 22,
      "absent_days": 3,
      "total_hours": 180,
      "total_ot_hours": 8,
      "total_wages": 20000,
      "total_materials_cost": 5000,
      "total_payable": 25000,
      "paid_amount": 10000,
      "pending_amount": 15000
    }
  ]
}
```

---

## 2. WORKFLOW ENDPOINTS (Blueprint: Draft → Submitted → Approved → Paid)

### 2.1 Submit Attendance for Approval
**POST** `/attendance/{id}/submit`

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance submitted for approval",
  "data": {
    "attendance_id": 101,
    "workflow_status": "submitted"
  }
}
```

---

### 2.2 Approve Attendance
**POST** `/attendance/{id}/approve`

**Request Body:**
```json
{
  "approved_by": "Manager Name"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance approved successfully",
  "data": {
    "attendance_id": 101,
    "workflow_status": "approved",
    "approval_status": "approved",
    "approved_by": "Manager Name",
    "approved_date": "2025-12-21T14:30:00Z"
  }
}
```

---

### 2.3 Reject Attendance
**POST** `/attendance/{id}/reject`

**Request Body:**
```json
{
  "approved_by": "Manager Name",
  "remarks": "Invalid time entry"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance rejected",
  "data": {
    "attendance_id": 101,
    "workflow_status": "rejected",
    "approval_status": "rejected",
    "remarks": "Invalid time entry"
  }
}
```

---

### 2.4 Mark as Paid
**POST** `/attendance/{id}/mark-paid`

**Request Body:**
```json
{
  "paid_by": "Accounts Manager",
  "payment_mode": "bank"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment marked successfully",
  "data": {
    "attendance_id": 101,
    "workflow_status": "paid",
    "payment_status": "paid",
    "paid_by": "Accounts Manager",
    "paid_date": "2025-12-21"
  }
}
```

---

## 3. LABOUR (WORKERS) ENDPOINTS

### 3.1 Get All Workers
**GET** `/labour/workers?site_id=1&work_type=mason&status=active`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "labour_id": 1,
      "labour_name": "Ramesh",
      "mobile_no": "9876543210",
      "work_type": "mason",
      "wage_per_day": 800,
      "status": "active",
      "id_proof_type": "aadhar",
      "site_id": 1
    }
  ]
}
```

---

### 3.2 Create Worker
**POST** `/labour/workers`

**Request Body:**
```json
{
  "labour_name": "Ramesh",
  "mobile_no": "9876543210",
  "work_type": "mason",
  "wage_per_day": 800,
  "status": "active",
  "id_proof_type": "aadhar",
  "id_proof_number": "123456789012"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "labour_id": 1,
    "labour_name": "Ramesh",
    "mobile_no": "9876543210",
    "work_type": "mason",
    "wage_per_day": 800,
    "status": "active"
  }
}
```

---

## 4. PROJECTS ENDPOINTS

### 4.1 Get All Projects
**GET** `/projects?status=active`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "project_id": 1,
      "project_name": "SVF Homes",
      "site_location": "Bangalore",
      "contractor_name": "ABC Contractors",
      "supervisor_name": "Mr. Ravi",
      "status": "active",
      "start_date": "2025-01-01",
      "end_date": "2025-12-31"
    }
  ]
}
```

---

### 4.2 Create Project
**POST** `/projects`

**Request Body:**
```json
{
  "project_name": "SVF Homes",
  "site_location": "Bangalore",
  "contractor_name": "ABC Contractors",
  "supervisor_name": "Mr. Ravi",
  "status": "active",
  "start_date": "2025-01-01",
  "end_date": "2025-12-31"
}
```

---

## 5. VALIDATION RULES (System Requirements)

### Mandatory Fields
- ✅ `labour_id` (Auto-generated)
- ✅ `attendance_date`
- ✅ `project_id`
- ✅ `labour_id`
- ✅ `attendance_status`

### Auto-Calculated Fields
- **Total Hours**: Calculated from `in_time` and `out_time`
- **OT Hours**: If `total_hours > 8`, then `OT = total_hours - 8`
- **Amount**: `wage_per_day + (ot_hours * (wage_per_day / 8) * 1.5)`

### Workflow Constraints
- ✅ Only **DRAFT** attendance can be **SUBMITTED**
- ✅ Only **SUBMITTED** attendance can be **APPROVED** or **REJECTED**
- ✅ Only **APPROVED** attendance can be **MARKED PAID**
- ✅ Only **APPROVED** attendance can have `payment_status = 'paid'`

### Payment Rules
- Cannot mark as **PAID** without **APPROVAL**
- Payment modes: **CASH**, **BANK**, **UPI**
- Payment status: **PENDING**, **PARTIAL**, **PAID**

---

## 6. ERROR RESPONSES

### 400 Bad Request
```json
{
  "success": false,
  "error": "Only draft attendance can be submitted"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Attendance record not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Database connection error"
}
```

---

## 7. EXAMPLE: Complete Workflow (Day-to-Day)

### Step 1: Supervisor marks attendance (DRAFT)
```bash
curl -X POST http://localhost:3000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "labour_id": 1,
    "attendance_date": "2025-12-21",
    "in_time": "09:00",
    "out_time": "18:00",
    "attendance_status": "present"
  }'
```

### Step 2: Supervisor submits for approval (SUBMITTED)
```bash
curl -X POST http://localhost:3000/api/attendance/101/submit
```

### Step 3: Manager approves (APPROVED)
```bash
curl -X POST http://localhost:3000/api/attendance/101/approve \
  -H "Content-Type: application/json" \
  -d '{"approved_by": "Manager"}'
```

### Step 4: Accounts marks as paid (PAID)
```bash
curl -X POST http://localhost:3000/api/attendance/101/mark-paid \
  -H "Content-Type: application/json" \
  -d '{"paid_by": "Accounts", "payment_mode": "bank"}'
```

---

## 8. REPORTING QUERIES

### Daily Attendance Report
```sql
SELECT * FROM v_daily_attendance WHERE attendance_date = '2025-12-21';
```

### Monthly Wages Report
```sql
SELECT * FROM v_monthly_wages WHERE month = '2025-12';
```

### Pending Payments
```sql
SELECT * FROM v_pending_payments WHERE payment_status IN ('pending', 'partial');
```

---
