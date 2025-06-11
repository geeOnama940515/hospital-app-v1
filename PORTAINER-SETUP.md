# Hospital Management System - Portainer Setup

## Quick Setup for Portainer

### Step 1: Build the Docker Image

Run this command in your project directory:

```bash
chmod +x build-for-portainer.sh
./build-for-portainer.sh
```

### Step 2: Deploy in Portainer

1. **Open Portainer** in your browser
2. **Go to Stacks** → **Add Stack**
3. **Name your stack**: `hospital-management`
4. **Copy and paste** the following YAML:

```yaml
version: '3.8'

services:
  hospital-app:
    image: hospital-management:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    deploy:
      replicas: 1
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  default:
    driver: bridge
```

5. **Click Deploy**

### Step 3: Access Your Application

- **URL**: `http://your-server-ip:3000`
- **Login with demo accounts**:
  - Doctor: `sarah.johnson@hospital.com` / `doctor123`
  - Nurse: `jennifer.smith@hospital.com` / `nurse123`
  - Admin: `admin@hospital.com` / `admin123`
  - Pharmacist: `lisa.chen@hospital.com` / `pharma123`

## Features Available

✅ **Dashboard** - Overview of hospital operations  
✅ **Emergency Room** - ER patient management  
✅ **OPD** - Outpatient department  
✅ **Patient Records** - Complete patient information system  
✅ **Admission Management** - Patient admissions and discharges  
✅ **Room Management** - Floor-wise room and bed management  
✅ **Pharmacy** - Medication and prescription management  
✅ **Nurse Charting** - Vital signs and nursing notes  

## Troubleshooting

### If the container fails to start:

1. **Check logs** in Portainer:
   - Go to Containers → hospital-management → Logs

2. **Common issues**:
   - Port 3000 already in use → Change port in stack YAML
   - Insufficient memory → Increase memory limits
   - Image not found → Rebuild the image

### To rebuild the image:

```bash
docker rmi hospital-management:latest
./build-for-portainer.sh
```

### To change the port:

In the stack YAML, change:
```yaml
ports:
  - "8080:3000"  # This will make it available on port 8080
```

## System Requirements

- **Memory**: 256MB minimum, 512MB recommended
- **CPU**: 1 core minimum
- **Storage**: 1GB for image + logs
- **Network**: Port 3000 (or your chosen port)

## Security Notes

- This is a **demo application** with mock data
- **Change default passwords** in production
- **Use HTTPS** in production environments
- **Restrict network access** as needed

## Support

For issues or questions:
1. Check container logs in Portainer
2. Verify port availability
3. Ensure sufficient system resources