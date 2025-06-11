'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Activity, 
  Users, 
  Pill, 
  FileText, 
  Stethoscope,
  Bed,
  Building,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Activity,
    roles: ['admin', 'doctor', 'nurse', 'pharmacist', 'receptionist']
  },
  {
    name: 'Emergency Room',
    href: '/dashboard/er',
    icon: Heart,
    roles: ['admin', 'doctor', 'nurse']
  },
  {
    name: 'OPD',
    href: '/dashboard/opd',
    icon: Users,
    roles: ['admin', 'doctor', 'receptionist']
  },
  {
    name: 'Admission',
    href: '/dashboard/admission',
    icon: Bed,
    roles: ['admin', 'doctor', 'nurse', 'receptionist']
  },
  {
    name: 'Room Management',
    href: '/dashboard/rooms',
    icon: Building,
    roles: ['admin', 'nurse', 'receptionist']
  },
  {
    name: 'Pharmacy',
    href: '/dashboard/pharmacy',
    icon: Pill,
    roles: ['admin', 'pharmacist', 'doctor']
  },
  {
    name: 'Patient Records',
    href: '/dashboard/patients',
    icon: FileText,
    roles: ['admin', 'doctor', 'nurse', 'receptionist']
  },
  {
    name: 'Nurse Charting',
    href: '/dashboard/nursing',
    icon: Stethoscope,
    roles: ['admin', 'nurse']
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="bg-white shadow-md"
        >
          {collapsed ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        collapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="bg-blue-600 p-2 rounded">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900">MediCare</h2>
              <p className="text-sm text-gray-600">Hospital System</p>
            </div>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setCollapsed(false)}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}