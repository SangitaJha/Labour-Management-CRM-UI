# Frontend Files - Upload to Hostinger public_html/

## ✅ Files Checklist

### Root HTML Files (upload to public_html/)
- [ ] dashboard.html
- [ ] login.html
- [ ] payments.html
- [ ] workers.html
- [ ] attendance.html
- [ ] contractors.html
- [ ] sites.html
- [ ] projects.html
- [ ] reports.html
- [ ] settings.html
- [ ] profile.html
- [ ] attendance-format.html
- [ ] test-backend.html

### CSS Folder (create public_html/css/)
- [ ] css/style.css

### JS Folder (create public_html/js/)
- [ ] js/auth.js

## 📂 Folder Structure on Hostinger

```
public_html/
├── dashboard.html
├── login.html
├── payments.html
├── workers.html
├── attendance.html
├── contractors.html
├── sites.html
├── projects.html
├── reports.html
├── settings.html
├── profile.html
├── attendance-format.html
├── test-backend.html
├── css/
│   └── style.css
└── js/
    └── auth.js
```

## 📝 Upload Instructions

### Via hPanel File Manager:
1. Login to hPanel
2. Go to Files → File Manager
3. Open public_html/ folder
4. Click "Upload Files" button
5. Select all HTML files from project root
6. Create new folder: "css"
7. Open css folder, upload style.css
8. Go back, create new folder: "js"
9. Open js folder, upload auth.js

### Via FTP (FileZilla):
1. Connect to ftp.yourdomain.com
2. Navigate to /public_html/
3. Drag files from left (local) to right (remote)
4. Right-click → Create directory: "css", "js"
5. Upload files to respective folders

## ⚠️ Important Notes

- DO NOT upload the backend/ folder to shared hosting (it won't work)
- Backend must run on VPS separately
- After upload, test: https://yourdomain.com/login.html
- If login fails, check browser console for API errors
