-- Hospital Management Database Schema
-- Production Database Initialization

-- Create database if not exists
SELECT 'CREATE DATABASE hospital_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hospital_db');

-- Connect to the hospital database
\c hospital_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Patients
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    blood_group VARCHAR(5),
    emergency_contact VARCHAR(255),
    allergies TEXT[],
    conditions TEXT[],
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_number VARCHAR(20) UNIQUE NOT NULL,
    floor VARCHAR(20) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,
    bed_capacity INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'partially-occupied', 'maintenance', 'cleaning')),
    amenities JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admissions
CREATE TABLE IF NOT EXISTS admissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admission_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id),
    room_id UUID REFERENCES rooms(id),
    bed_number VARCHAR(20),
    admission_date TIMESTAMP WITH TIME ZONE NOT NULL,
    expected_discharge_date DATE,
    actual_discharge_date TIMESTAMP WITH TIME ZONE,
    admission_type VARCHAR(20) NOT NULL CHECK (admission_type IN ('emergency', 'planned', 'transfer')),
    department VARCHAR(100) NOT NULL,
    attending_doctor VARCHAR(255),
    diagnosis TEXT,
    status VARCHAR(20) DEFAULT 'admitted' CHECK (status IN ('admitted', 'discharged', 'transferred')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Vital Signs
CREATE TABLE IF NOT EXISTS vital_signs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    admission_id UUID REFERENCES admissions(id),
    temperature DECIMAL(4,1),
    temperature_unit VARCHAR(1) DEFAULT 'F',
    systolic_bp INTEGER,
    diastolic_bp INTEGER,
    heart_rate INTEGER,
    respiratory_rate INTEGER,
    oxygen_saturation INTEGER,
    pain_scale INTEGER CHECK (pain_scale >= 0 AND pain_scale <= 10),
    weight DECIMAL(5,2),
    height INTEGER,
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Medications
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medication_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    min_stock_level INTEGER NOT NULL DEFAULT 0,
    max_stock_level INTEGER NOT NULL DEFAULT 1000,
    unit_price DECIMAL(10,2),
    supplier VARCHAR(255),
    expiry_date DATE,
    batch_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    admission_id UUID REFERENCES admissions(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'dispensed', 'cancelled')),
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'emergency')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Prescription Items
CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID REFERENCES prescriptions(id),
    medication_id UUID REFERENCES medications(id),
    quantity INTEGER NOT NULL,
    dosage VARCHAR(255),
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    department VARCHAR(100) NOT NULL,
    appointment_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Nursing Notes
CREATE TABLE IF NOT EXISTS nursing_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    admission_id UUID REFERENCES admissions(id),
    nurse_id UUID REFERENCES users(id),
    note_type VARCHAR(20) DEFAULT 'routine' CHECK (note_type IN ('routine', 'incident', 'medication', 'assessment')),
    note_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Room Assignments
CREATE TABLE IF NOT EXISTS room_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    room_id UUID REFERENCES rooms(id),
    bed_number VARCHAR(20),
    assignment_type VARCHAR(20) NOT NULL CHECK (assignment_type IN ('admission', 'transfer', 'readmission')),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    assigned_by UUID REFERENCES users(id),
    unassigned_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_admissions_patient_id ON admissions(patient_id);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_admission_date ON admissions(admission_date);
CREATE INDEX IF NOT EXISTS idx_vital_signs_patient_id ON vital_signs(patient_id);
CREATE INDEX IF NOT EXISTS idx_vital_signs_recorded_at ON vital_signs(recorded_at);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_floor ON rooms(floor);

-- Insert sample data
INSERT INTO users (email, password_hash, name, role, department) VALUES
('admin@hospital.com', '$2b$10$example_hash', 'Admin User', 'admin', NULL),
('sarah.johnson@hospital.com', '$2b$10$example_hash', 'Dr. Sarah Johnson', 'doctor', 'Emergency'),
('jennifer.smith@hospital.com', '$2b$10$example_hash', 'Nurse Jennifer Smith', 'nurse', 'Emergency'),
('lisa.chen@hospital.com', '$2b$10$example_hash', 'Pharmacist Lisa Chen', 'pharmacist', 'Pharmacy')
ON CONFLICT (email) DO NOTHING;

-- Insert sample rooms
INSERT INTO rooms (room_number, floor, room_type, department, bed_capacity, status) VALUES
('ER-1', 'Ground', 'Emergency', 'Emergency', 1, 'available'),
('ER-2', 'Ground', 'Emergency', 'Emergency', 1, 'available'),
('A-101', 'First', 'Private', 'Cardiology', 1, 'available'),
('A-102', 'First', 'Private', 'Cardiology', 1, 'available'),
('A-201', 'First', 'Semi-Private', 'General Medicine', 2, 'available'),
('ICU-1', 'Second', 'ICU', 'ICU', 1, 'available'),
('ICU-2', 'Second', 'ICU', 'ICU', 1, 'available')
ON CONFLICT (room_number) DO NOTHING;

-- Insert sample medications
INSERT INTO medications (medication_id, name, category, stock_quantity, min_stock_level, unit_price) VALUES
('MED001', 'Paracetamol 500mg', 'Analgesic', 150, 50, 2.50),
('MED002', 'Amoxicillin 250mg', 'Antibiotic', 25, 30, 8.75),
('MED003', 'Metformin 500mg', 'Antidiabetic', 200, 100, 5.25),
('MED004', 'Lisinopril 10mg', 'ACE Inhibitor', 80, 50, 12.00)
ON CONFLICT (medication_id) DO NOTHING;