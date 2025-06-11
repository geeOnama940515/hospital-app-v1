# Hospital Management System - Portainer Setup Guide

## 🚀 Super Easy Deployment with Portainer

### Step 1: Push to GitHub Repository
1. **Create a public GitHub repository**
2. **Push this code** to your repository:
```bash
git add .
git commit -m "Hospital management system"
git push origin main
```

### Step 2: Deploy in Portainer
1. **Open Portainer** → **Stacks** → **Add Stack**
2. **Name**: `hospital-management`
3. **Select "Repository"** method
4. **Repository URL**: `https://github.com/your-username/your-repo-name`
5. **Compose file path**: `portainer-stack.yml`
6. **Click Deploy**

That's it! 🎉

## 🌐 Access Your Application

After deployment (takes 3-5 minutes to build):
```
http://your-server-ip:9999
```

## 🔑 Demo Login Accounts

| Role | Email | Password |
|------|-------|----------|
| **Doctor** | sarah.johnson@hospital.com | doctor123 |
| **Nurse** | jennifer.smith@hospital.com | nurse123 |
| **Admin** | admin@hospital.com | admin123 |
| **Pharmacist** | lisa.chen@hospital.com | pharma123 |

## ✨ What You Get

✅ **Complete Hospital Management System**  
✅ **Dashboard** - Operations overview  
✅ **Emergency Room** - ER management  
✅ **OPD** - Outpatient department  
✅ **Patient Records** - Complete patient system  
✅ **Room Management** - Floor-wise room/bed management  
✅ **Admission Management** - Patient admissions/discharges  
✅ **Pharmacy** - Medication management  
✅ **Nurse Charting** - Vital signs and notes  

## 🛠️ Alternative: Manual YAML Method

If repository method doesn't work, copy this YAML:

```yaml
version: '3.8'

services:
  hospital-app:
    build:
      context: .
      dockerfile: Dockerfile.simple
    ports:
      - "9999:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

networks:
  default:
    driver: bridge
```

## 🔧 Troubleshooting

### Build Fails
- **Check logs** in Portainer container logs
- **Ensure** repository is public
- **Verify** internet connection on server
- **Wait longer** - build takes 3-5 minutes

### Port Issues
Change port in stack:
```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### Memory Issues
Increase memory if needed:
```yaml
deploy:
  resources:
    limits:
      memory: 2G
```

### Build Taking Too Long
The build process includes:
1. **Installing dependencies** (1-2 minutes)
2. **Building Next.js app** (2-3 minutes)
3. **Starting server** (30 seconds)

Total: **3-5 minutes** - be patient! ⏳

## 📊 System Requirements

- **Memory**: 512MB minimum, 1GB recommended
- **CPU**: 1 core minimum
- **Storage**: 2GB for build + runtime
- **Port**: 9999 (configurable)

## 🎯 Why This Works Now

✅ **Fixed build configuration**  
✅ **Uses static export** (more reliable)  
✅ **Simple HTTP server** (serve package)  
✅ **No complex dependencies**  
✅ **Production-ready**  

## 🔒 Security Notes

- Demo application with mock data
- Change passwords in production
- Use HTTPS in production
- Configure firewall as needed

## 🆘 Need Help?

1. **Check Portainer logs**: Containers → hospital-management → Logs
2. **Verify repository**: Make sure it's public and accessible
3. **Check resources**: Ensure sufficient RAM/CPU
4. **Port conflicts**: Try different port if 9999 is busy
5. **Wait for build**: Build takes 3-5 minutes

## 🎉 Success!

Once deployed, you'll have a **complete hospital management system** running on your server with all the features working perfectly!

### 🏥 Features Available:
- **Dashboard** with real-time statistics
- **Emergency Room** management
- **Patient Records** system
- **Room Management** with floor plans
- **Admission/Discharge** workflows
- **Pharmacy** inventory
- **Nurse Charting** system
- **OPD** appointment management