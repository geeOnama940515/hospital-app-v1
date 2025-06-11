-- Hospital Management Database Schema
-- Development Database Initialization

-- Create database if not exists
SELECT 'CREATE DATABASE hospital_dev_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hospital_dev_db');

-- Connect to the hospital database
\c hospital_dev_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Copy the same schema as production but with more sample data for development
-- (Include the same tables as init.sql but with additional test data)

-- Users and Authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'doctor', 'nurse', 'pharmacist', 'receptionist')),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert development users with simple passwords for testing
INSERT INTO users (email, password_hash, name, role, department) VALUES
('admin@hospital.com', '$2b$10$example_hash', 'Admin User', 'admin', NULL),
('sarah.johnson@hospital.com', '$2b$10$example_hash', 'Dr. Sarah Johnson', 'doctor', 'Emergency'),
('jennifer.smith@hospital.com', '$2b$10$example_hash', 'Nurse Jennifer Smith', 'nurse', 'Emergency'),
('lisa.chen@hospital.com', '$2b$10$example_hash', 'Pharmacist Lisa Chen', 'pharmacist', 'Pharmacy'),
('test.doctor@hospital.com', '$2b$10$example_hash', 'Dr. Test Doctor', 'doctor', 'Cardiology'),
('test.nurse@hospital.com', '$2b$10$example_hash', 'Test Nurse', 'nurse', 'ICU')
ON CONFLICT (email) DO NOTHING;

-- Add more development-specific sample data here...