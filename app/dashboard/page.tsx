'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Users, 
  Heart, 
  Pill, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const stats = [
  {
    name: 'Total Patients Today',
    value: '124',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Emergency Cases',
    value: '8',
    change: '+2',
    changeType: 'negative',
    icon: Heart,
    color: 'red'
  },
  {
    name: 'OPD Appointments',
    value: '45',
    change: '+8%',
    changeType: 'positive',
    icon: Clock,
    color: 'green'
  },
  {
    name: 'Pharmacy Orders',
    value: '67',
    change: '+15%',
    changeType: 'positive',
    icon: Pill,
    color: 'purple'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'admission',
    message: 'New patient admitted to ER - John Doe',
    time: '5 minutes ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'discharge',
    message: 'Patient discharged from Ward A - Room 205',
    time: '15 minutes ago',
    priority: 'normal'
  },
  {
    id: 3,
    type: 'medication',
    message: 'Low stock alert: Paracetamol (50 units remaining)',
    time: '30 minutes ago',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'appointment',
    message: 'New OPD appointment scheduled - Dr. Smith',
    time: '1 hour ago',
    priority: 'normal'
  }
];

const bedOccupancy = [
  { department: 'Emergency Room', occupied: 6, total: 8, percentage: 75 },
  { department: 'General Ward', occupied: 28, total: 40, percentage: 70 },
  { department: 'ICU', occupied: 8, total: 12, percentage: 67 },
  { department: 'Pediatrics', occupied: 12, total: 20, percentage: 60 }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your hospital today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className={`h-3 w-3 mr-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">from yesterday</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from across the hospital</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className={`mt-1 h-2 w-2 rounded-full ${
                      activity.priority === 'high' ? 'bg-red-500' :
                      activity.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.priority === 'high' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bed Occupancy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Bed Occupancy
              </CardTitle>
              <CardDescription>Current bed utilization across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bedOccupancy.map((department) => (
                  <div key={department.department} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {department.department}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {department.occupied}/{department.total}
                        </span>
                        <Badge variant={department.percentage > 80 ? 'destructive' : 
                                      department.percentage > 70 ? 'secondary' : 'default'}>
                          {department.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={department.percentage} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}