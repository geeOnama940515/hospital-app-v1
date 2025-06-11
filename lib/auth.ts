import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'receptionist';
  department?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    password: 'doctor123',
    role: 'doctor',
    department: 'Emergency'
  },
  {
    id: '2',
    name: 'Nurse Jennifer Smith',
    email: 'jennifer.smith@hospital.com',
    password: 'nurse123',
    role: 'nurse',
    department: 'Emergency'
  },
  {
    id: '3',
    name: 'Admin Mike Wilson',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Pharmacist Lisa Chen',
    email: 'lisa.chen@hospital.com',
    password: 'pharma123',
    role: 'pharmacist',
    department: 'Pharmacy'
  }
];

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'hospital-auth'
    }
  )
);