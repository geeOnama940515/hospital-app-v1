#!/bin/bash

# Hospital Database Backup Script
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="hospital_db_backup_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create database backup
pg_dump -h postgres -U hospital_user -d hospital_db > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress the backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

# Remove backups older than 7 days
find $BACKUP_DIR -name "hospital_db_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"