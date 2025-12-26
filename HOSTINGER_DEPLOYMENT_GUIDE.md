# 🚀 Hostinger Deployment Guide
## Labour Management CRM - Complete Setup

---

## 📋 Choose Your Deployment Method

### Option A: Shared Hosting (Frontend) + VPS (Backend) ⭐ RECOMMENDED FOR BEGINNERS
- **Frontend**: Upload to Hostinger Shared Hosting
- **Backend**: Deploy to Hostinger VPS or any Node.js hosting
- **Best for**: If you already have shared hosting or want simplest setup

### Option B: VPS Only (Full Stack)
- **Both**: Frontend + Backend on Hostinger VPS
- **Best for**: Complete control, better performance, single server

---

## 🌟 OPTION A: Shared Hosting + VPS

### STEP 1: Prepare Frontend Files

Files to upload (from project root):
```
✅ dashboard.html
✅ login.html
✅ payments.html
✅ workers.html
✅ attendance.html
✅ contractors.html
✅ sites.html
✅ projects.html
✅ reports.html
✅ settings.html
✅ profile.html
✅ css/style.css
✅ js/auth.js
```

### STEP 2: Upload Frontend to Hostinger Shared Hosting

**Via hPanel File Manager:**
1. Login to Hostinger hPanel (https://hpanel.hostinger.com)
2. Go to **Files → File Manager**
3. Navigate to `public_html/` folder
4. Click **Upload Files**
5. Upload all HTML files to `public_html/`
6. Create folders: `css/` and `js/`
7. Upload `style.css` to `public_html/css/`
8. Upload `auth.js` to `public_html/js/`

**Via FTP (FileZilla):**
1. Download FileZilla (https://filezilla-project.org/)
2. Get FTP credentials from hPanel → **Files → FTP Accounts**
3. Connect: Host: `ftp.yourdomain.com`, Username: your FTP user, Password: your FTP password
4. Navigate to `public_html/` on remote side
5. Drag and drop all files from local to remote

### STEP 3: Setup Backend on VPS

**A. Create MySQL Database in hPanel:**
1. Go to hPanel → **Databases → MySQL Databases**
2. Click **Create Database**
3. Database name: `labour_attendance_db`
4. Username: Create new user (e.g., `labour_admin`)
5. Password: Generate strong password
6. **SAVE THESE CREDENTIALS** (you'll need them)

**B. Connect to VPS via SSH:**
```bash
ssh root@your-vps-ip
```

**C. Install Node.js, PM2, and MySQL client:**
```bash
sudo apt update
sudo apt install -y curl mysql-client
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

**D. Upload Backend to VPS:**

Option 1 - Using Git (if you have repo):
```bash
cd /var/www
git clone https://github.com/yourusername/labour-crm.git
cd labour-crm/backend
```

Option 2 - Using SCP from your local machine:
```bash
# On your Windows machine (PowerShell)
scp -r "c:\Users\sangi\Downloads\Labour_Management_CRM_UI\backend" root@your-vps-ip:/var/www/labour-crm/
```

**E. Configure Environment:**
```bash
cd /var/www/labour-crm/backend
cp .env.production.example .env
nano .env
```

Edit these values in `.env`:
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

DB_HOST=your-db-host-from-hpanel
DB_USER=labour_admin
DB_PASSWORD=your-db-password
DB_NAME=labour_attendance_db

JWT_SECRET=your-random-secret-here-change-this
SESSION_SECRET=another-random-secret-here
```

Save: `Ctrl+X`, `Y`, `Enter`

**F. Import Database Schema:**
```bash
mysql -h your-db-host -u labour_admin -p labour_attendance_db < migrations/001-create-schema.sql
# Enter password when prompted
```

**G. Install Dependencies and Start:**
```bash
npm ci --production
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # Follow the instructions it gives
```

**H. Verify Backend is Running:**
```bash
curl http://localhost:3000/api/health
# Should return: {"status":"OK","timestamp":"..."}
```

### STEP 4: Configure CORS

The backend needs to allow your frontend domain. Your `.env` already has:
```
FRONTEND_URL=https://yourdomain.com
```

If backend is on different domain (e.g., api.yourdomain.com), update frontend API URL:
- Edit `js/auth.js` line 3-5
- Change to: `const API_URL = 'https://api.yourdomain.com/api';`

### STEP 5: Test Your Deployment

1. Open your browser: `https://yourdomain.com/login.html`
2. Try demo login: `admin@labourcrm.com` / `admin123`
3. If it works → ✅ Success!

---

## 🖥️ OPTION B: VPS Only (Full Stack)

### STEP 1: Prepare VPS

**A. Connect to VPS:**
```bash
ssh root@your-vps-ip
```

**B. Install Prerequisites:**
```bash
sudo apt update
sudo apt install -y curl nginx mysql-server
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

**C. Secure MySQL:**
```bash
sudo mysql_secure_installation
# Follow prompts, set root password
```

### STEP 2: Create Database

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE labour_attendance_db;
CREATE USER 'labour_admin'@'localhost' IDENTIFIED BY 'YourStrongPassword';
GRANT ALL PRIVILEGES ON labour_attendance_db.* TO 'labour_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### STEP 3: Upload Project to VPS

**From your local machine (PowerShell):**
```powershell
# Zip the project
Compress-Archive -Path "c:\Users\sangi\Downloads\Labour_Management_CRM_UI\*" -DestinationPath "c:\Users\sangi\Downloads\labour-crm.zip"

# Upload via SCP
scp "c:\Users\sangi\Downloads\labour-crm.zip" root@your-vps-ip:/var/www/
```

**On VPS:**
```bash
cd /var/www
unzip labour-crm.zip -d labour-crm
cd labour-crm/backend
```

### STEP 4: Configure Backend

```bash
cp .env.production.example .env
nano .env
```

Set:
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

DB_HOST=localhost
DB_USER=labour_admin
DB_PASSWORD=YourStrongPassword
DB_NAME=labour_attendance_db

JWT_SECRET=change-this-to-random-string
SESSION_SECRET=change-this-too
```

### STEP 5: Import Schema and Start Backend

```bash
mysql -u labour_admin -p labour_attendance_db < migrations/001-create-schema.sql
npm ci --production
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### STEP 6: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/labour-crm
```

Paste (replace `yourdomain.com`):
```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  root /var/www/labour-crm;
  index dashboard.html;

  # Proxy API to Node.js
  location /api/ {
    proxy_pass http://127.0.0.1:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
  }

  # Serve static frontend
  location / {
    try_files $uri $uri/ /dashboard.html;
  }
}
```

**Enable site and reload:**
```bash
sudo ln -s /etc/nginx/sites-available/labour-crm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### STEP 7: Setup SSL (Optional but Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### STEP 8: Point DNS to VPS

1. Login to your domain registrar or Hostinger DNS settings
2. Create A record: `yourdomain.com` → `your-vps-ip`
3. Create A record: `www.yourdomain.com` → `your-vps-ip`
4. Wait 5-60 minutes for DNS propagation

### STEP 9: Test

Visit: `http://yourdomain.com/login.html`

---

## 🔐 Demo Login Credentials

After backend starts and seeds data:
- **Admin**: admin@labourcrm.com / admin123
- **Manager**: manager@labourcrm.com / manager123
- **Supervisor**: supervisor@labourcrm.com / supervisor123

---

## 🐛 Troubleshooting

### Frontend loads but API fails
- Check backend is running: `pm2 status`
- Check backend logs: `pm2 logs labour-crm-api`
- Test API directly: `curl http://localhost:3000/api/health`
- Verify CORS: Check `FRONTEND_URL` in `.env` matches your domain

### "Access denied" database error
- Verify credentials in `.env`
- Test connection: `mysql -h DB_HOST -u DB_USER -p DB_NAME`
- Check user has permissions: `GRANT ALL PRIVILEGES ON labour_attendance_db.* TO 'user'@'host';`

### 502 Bad Gateway (Nginx)
- Backend not running: `pm2 start ecosystem.config.js`
- Wrong port in Nginx config: Ensure `proxy_pass` uses port from `.env` (default 3000)

### Can't upload via FTP
- Get FTP credentials from hPanel → Files → FTP Accounts
- Use passive mode in FileZilla
- Try port 21 (FTP) or 22 (SFTP)

---

## 📞 Need Help?

1. Check logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/nginx/error.log`
3. Database logs: `sudo tail -f /var/log/mysql/error.log`

---

## ✅ Post-Deployment Checklist

- [ ] Frontend accessible at yourdomain.com
- [ ] Can login with demo credentials
- [ ] Dashboard loads with data
- [ ] Workers page loads
- [ ] Attendance page loads
- [ ] Payments page loads
- [ ] API health check works: yourdomain.com/api/health

---

**🎉 Congratulations! Your Labour Management CRM is now live on Hostinger!**
