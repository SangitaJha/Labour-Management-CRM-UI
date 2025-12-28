-- ============================================
-- Labour Attendance Management System Schema
-- ============================================

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(200) NOT NULL,
  site_location VARCHAR(255) NOT NULL,
  contractor_name VARCHAR(200),
  supervisor_name VARCHAR(200),
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'completed', 'on_hold') DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created_date (created_date)
);

-- Labour Master Table
CREATE TABLE IF NOT EXISTS workers (
  labour_id INT PRIMARY KEY AUTO_INCREMENT,
  labour_name VARCHAR(100) NOT NULL,
  mobile_no VARCHAR(20) NOT NULL,
  work_type ENUM('mason', 'carpenter', 'electrician', 'plumber', 'painter', 'helper', 'centring', 'sand-filling', 'tiles', 'other') DEFAULT 'helper',
  wage_per_day DECIMAL(10, 2) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  id_proof_type ENUM('aadhar', 'pan', 'voter_id', 'driving_license', 'other'),
  id_proof_number VARCHAR(50),
  site_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_mobile (mobile_no),
  INDEX idx_status (status),
  INDEX idx_work_type (work_type)
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendances (
  attendance_id INT PRIMARY KEY AUTO_INCREMENT,
  attendance_date DATE NOT NULL,
  project_id INT NOT NULL,
  labour_id INT NOT NULL,
  in_time TIME,
  out_time TIME,
  total_hours DECIMAL(5, 2) DEFAULT 8.00,
  ot_hours DECIMAL(5, 2) DEFAULT 0.00,
  attendance_status ENUM('present', 'absent', 'half_day', 'leave') DEFAULT 'present',
  amount DECIMAL(10, 2) DEFAULT 0.00,
  work_details JSON,
  material_details JSON,
  materials_cost DECIMAL(10, 2) DEFAULT 0.00,
  geo_latitude VARCHAR(50),
  geo_longitude VARCHAR(50),
  remarks TEXT,
  created_by VARCHAR(100),
  workflow_status ENUM('draft', 'submitted', 'approved', 'rejected', 'paid') DEFAULT 'draft',
  approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  approved_by VARCHAR(100),
  approved_date DATETIME,
  payment_status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
  paid_by VARCHAR(100),
  paid_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (labour_id) REFERENCES workers(labour_id) ON DELETE CASCADE,
  UNIQUE KEY unique_attendance (labour_id, attendance_date),
  INDEX idx_attendance_date (attendance_date),
  INDEX idx_workflow_status (workflow_status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_labour_id (labour_id)
);

-- Payment Table
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  attendance_id INT NOT NULL,
  payment_status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
  payment_mode ENUM('cash', 'bank', 'upi'),
  paid_date DATE,
  reference_no VARCHAR(100),
  amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (attendance_id) REFERENCES attendances(attendance_id) ON DELETE CASCADE,
  INDEX idx_payment_status (payment_status),
  INDEX idx_paid_date (paid_date)
);

-- Create Views for Reports

-- Daily Attendance Report View
CREATE OR REPLACE VIEW v_daily_attendance AS
SELECT 
  a.attendance_date,
  p.project_id,
  p.project_name,
  p.site_location,
  w.labour_id,
  w.labour_name,
  w.work_type,
  w.wage_per_day,
  a.in_time,
  a.out_time,
  a.total_hours,
  a.ot_hours,
  a.attendance_status,
  a.amount,
  a.workflow_status,
  a.payment_status
FROM attendances a
JOIN projects p ON a.project_id = p.project_id
JOIN workers w ON a.labour_id = w.labour_id
ORDER BY a.attendance_date DESC, w.labour_name;

-- Monthly Wages Report View
CREATE OR REPLACE VIEW v_monthly_wages AS
SELECT 
  DATE_FORMAT(a.attendance_date, '%Y-%m') as month,
  w.labour_id,
  w.labour_name,
  COUNT(*) as total_days,
  SUM(CASE WHEN a.attendance_status = 'present' THEN 1 ELSE 0 END) as present_days,
  SUM(CASE WHEN a.attendance_status = 'absent' THEN 1 ELSE 0 END) as absent_days,
  SUM(a.total_hours) as total_hours,
  SUM(a.ot_hours) as total_ot_hours,
  SUM(a.amount) as total_wages,
  SUM(a.materials_cost) as total_material_cost,
  (SUM(a.amount) + SUM(a.materials_cost)) as total_payable,
  SUM(CASE WHEN a.payment_status = 'paid' THEN a.amount ELSE 0 END) as paid_amount,
  SUM(CASE WHEN a.payment_status = 'pending' THEN a.amount ELSE 0 END) as pending_amount
FROM attendances a
JOIN workers w ON a.labour_id = w.labour_id
GROUP BY DATE_FORMAT(a.attendance_date, '%Y-%m'), w.labour_id, w.labour_name
ORDER BY month DESC, w.labour_name;

-- Pending Payments Report View
CREATE OR REPLACE VIEW v_pending_payments AS
SELECT 
  a.attendance_id,
  a.attendance_date,
  w.labour_id,
  w.labour_name,
  w.work_type,
  p.project_name,
  a.amount,
  a.materials_cost,
  (a.amount + a.materials_cost) as total_amount,
  a.payment_status,
  a.workflow_status,
  a.approved_date,
  DATEDIFF(NOW(), a.attendance_date) as days_pending
FROM attendances a
JOIN projects p ON a.project_id = p.project_id
JOIN workers w ON a.labour_id = w.labour_id
WHERE a.payment_status = 'pending' OR a.payment_status = 'partial'
ORDER BY a.attendance_date ASC;

-- Contractor Summary View
CREATE OR REPLACE VIEW v_contractor_summary AS
SELECT 
  p.contractor_name,
  COUNT(DISTINCT w.labour_id) as total_workers,
  COUNT(DISTINCT a.attendance_date) as total_working_days,
  SUM(CASE WHEN a.attendance_status = 'present' THEN 1 ELSE 0 END) as present_count,
  SUM(a.amount) as total_wages_paid,
  SUM(a.materials_cost) as total_material_cost
FROM projects p
LEFT JOIN attendances a ON p.project_id = a.project_id
LEFT JOIN workers w ON a.labour_id = w.labour_id AND a.project_id = p.project_id
GROUP BY p.contractor_name
ORDER BY total_wages_paid DESC;

-- ============================================
-- Sample Data (Optional)
-- ============================================

INSERT INTO projects (project_name, site_location, contractor_name, supervisor_name, status) VALUES
('SVF Homes', 'Bangalore', 'ABC Contractors', 'Mr. Ravi', 'active'),
('Metro Towers', 'Delhi', 'XYZ Construction', 'Mr. Kumar', 'active'),
('Tech Park', 'Mumbai', 'BuildPro Ltd', 'Mr. Sharma', 'active');

INSERT INTO workers (labour_name, mobile_no, work_type, wage_per_day, status) VALUES
('Ramesh', '9876543210', 'mason', 800, 'active'),
('Suresh', '9876543211', 'helper', 600, 'active'),
('Kumar', '9876543212', 'electrician', 900, 'active'),
('Ravi Kumar', '9876543213', 'mason', 850, 'active'),
('Anand', '9876543214', 'helper', 600, 'active');
