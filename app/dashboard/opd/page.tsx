'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  User,
  CheckCircle,
  XCircle,
  Search
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const doctors = [
  { id: 'DOC001', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
  { id: 'DOC002', name: 'Dr. Michael Brown', specialty: 'Neurology', available: true },
  { id: 'DOC003', name: 'Dr. Emily Davis', specialty: 'Pediatrics', available: false },
  { id: 'DOC004', name: 'Dr. James Wilson', specialty: 'Orthopedics', available: true },
  { id: 'DOC005', name: 'Dr. Lisa Chen', specialty: 'Dermatology', available: true }
];

const appointments = [
  {
    id: 'APT001',
    patientName: 'Alice Smith',
    patientId: 'P001',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2024-01-15',
    time: '09:00 AM',
    status: 'scheduled',
    type: 'consultation'
  },
  {
    id: 'APT002',
    patientName: 'Bob Johnson',
    patientId: 'P002',
    doctorName: 'Dr. Michael Brown',
    specialty: 'Neurology',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'in-progress',
    type: 'follow-up'
  },
  {
    id: 'APT003',
    patientName: 'Carol Williams',
    patientId: 'P003',
    doctorName: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    date: '2024-01-15',
    time: '11:15 AM',
    status: 'completed',
    type: 'consultation'
  },
  {
    id: 'APT004',
    patientName: 'David Brown',
    patientId: 'P004',
    doctorName: 'Dr. Lisa Chen',
    specialty: 'Dermatology',
    date: '2024-01-15',
    time: '02:00 PM',
    status: 'scheduled',
    type: 'procedure'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'scheduled':
      return <Badge variant="outline">Scheduled</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function OPDPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Users className="h-8 w-8 mr-3 text-blue-600" />
              Outpatient Department
            </h1>
            <p className="text-gray-600">Manage appointments and outpatient services</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Book a new appointment for a patient</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientSearch">Patient</Label>
                  <Input id="patientSearch" placeholder="Search patient by name or ID" />
                </div>
                <div>
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.filter(doc => doc.available).map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Appointment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="09:30">09:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="11:30">11:30 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="14:30">02:30 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="procedure">Procedure</SelectItem>
                      <SelectItem value="checkup">Routine Checkup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Appointment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="doctors">Doctor Schedule</TabsTrigger>
            <TabsTrigger value="queue">Patient Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredAppointments.length} appointments found
                </div>
              </div>

              <div className="grid gap-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                            <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Doctor:</span>
                          <p className="text-gray-600">{appointment.doctorName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Specialty:</span>
                          <p className="text-gray-600">{appointment.specialty}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Type:</span>
                          <p className="text-gray-600 capitalize">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        {appointment.status === 'scheduled' && (
                          <>
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Check In
                            </Button>
                          </>
                        )}
                        {appointment.status === 'in-progress' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doctors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {doctor.name}
                      <Badge variant={doctor.available ? "default" : "secondary"}>
                        {doctor.available ? "Available" : "Unavailable"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Today's Appointments:</span>
                        <span className="font-medium">
                          {appointments.filter(apt => apt.doctorName === doctor.name).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Available:</span>
                        <span className="font-medium text-green-600">3:30 PM</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      View Schedule
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Queue Status</CardTitle>
                  <CardDescription>Patients waiting to be seen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.status === 'scheduled').map((appointment, index) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-gray-600">{appointment.doctorName} - {appointment.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-gray-600">Waiting: 10 min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}