# 🏥 Hospital Management System

A comprehensive hospital management system built with Next.js, featuring patient records, room management, pharmacy, and more.

## 🚀 Quick Deploy with Portainer (Port 9999)

### Repository Method (Recommended)
1. **Push this code** to a public GitHub repository
2. **Open Portainer** → Stacks → Add Stack
3. **Select "Repository"**
4. **Repository URL**: `https://github.com/your-username/your-repo-name`
5. **Compose file**: `portainer-stack.yml`
6. **Deploy**

### Manual Method
1. **Copy** the contents of `portainer-stack.yml`
2. **Open Portainer** → Stacks → Add Stack
3. **Paste** the YAML content
4. **Deploy**

## 🌐 Access

After deployment: **http://your-server:9999**

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Doctor | sarah.johnson@hospital.com | doctor123 |
| Nurse | jennifer.smith@hospital.com | nurse123 |
| Admin | admin@hospital.com | admin123 |
| Pharmacist | lisa.chen@hospital.com | pharma123 |

## ✨ Features

- 📊 **Dashboard** - Hospital operations overview
- 🚨 **Emergency Room** - ER patient management
- 👥 **OPD** - Outpatient department
- 📋 **Patient Records** - Complete patient information
- 🏠 **Admission Management** - Patient admissions/discharges
- 🏢 **Room Management** - Floor-wise room and bed management
- 💊 **Pharmacy** - Medication and prescription management
- 🩺 **Nurse Charting** - Vital signs and nursing notes

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📊 System Requirements

- **Memory**: 512MB minimum, 1GB recommended
- **CPU**: 1 core minimum
- **Storage**: 2GB for build + runtime
- **Port**: 9999 (configurable)

## 🔒 Security

This is a demo application with mock data. For production use:
- Change default passwords
- Implement proper authentication
- Use HTTPS
- Configure proper access controls

## 📝 License

MIT License - see LICENSE file for details