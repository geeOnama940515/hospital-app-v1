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
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  AlertTriangle, 
  Clock, 
  Plus,
  User,
  Activity,
  Thermometer,
  Stethoscope
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const erPatients = [
  {
    id: 'ER001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    complaint: 'Chest pain, shortness of breath',
    triage: 'critical',
    arrivalTime: '10:30 AM',
    bedNumber: 'ER-1',
    vitals: { bp: '140/90', hr: '95', temp: '98.6°F', spo2: '96%' },
    status: 'admitted'
  },
  {
    id: 'ER002',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    complaint: 'Severe abdominal pain',
    triage: 'urgent',
    arrivalTime: '11:15 AM',
    bedNumber: 'ER-3',
    vitals: { bp: '120/80', hr: '88', temp: '99.2°F', spo2: '98%' },
    status: 'under-treatment'
  },
  {
    id: 'ER003',
    name: 'Mike Wilson',
    age: 28,
    gender: 'Male',
    complaint: 'Minor laceration on hand',
    triage: 'stable',
    arrivalTime: '12:00 PM',
    bedNumber: 'ER-5',
    vitals: { bp: '118/76', hr: '72', temp: '98.4°F', spo2: '99%' },
    status: 'waiting'
  }
];

const beds = [
  { number: 'ER-1', status: 'occupied', patient: 'John Doe' },
  { number: 'ER-2', status: 'available', patient: null },
  { number: 'ER-3', status: 'occupied', patient: 'Sarah Johnson' },
  { number: 'ER-4', status: 'maintenance', patient: null },
  { number: 'ER-5', status: 'occupied', patient: 'Mike Wilson' },
  { number: 'ER-6', status: 'available', patient: null },
  { number: 'ER-7', status: 'available', patient: null },
  { number: 'ER-8', status: 'available', patient: null }
];

const getTriageBadge = (triage: string) => {
  switch (triage) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'urgent':
      return <Badge className="bg-orange-500 hover:bg-orange-600">Urgent</Badge>;
    case 'stable':
      return <Badge variant="secondary">Stable</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getBedStatusColor = (status: string) => {
  switch (status) {
    case 'occupied':
      return 'bg-red-100 border-red-300 text-red-800';
    case 'available':
      return 'bg-green-100 border-green-300 text-green-800';
    case 'maintenance':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    default:
      return 'bg-gray-100 border-gray-300 text-gray-800';
  }
};

export default function ERPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Heart className="h-8 w-8 mr-3 text-red-600" />
              Emergency Room
            </h1>
            <p className="text-gray-600">Monitor and manage emergency cases</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Register New ER Patient</DialogTitle>
                <DialogDescription>Add a new patient to the emergency room</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="complaint">Chief Complaint</Label>
                  <Textarea id="complaint" placeholder="Describe the main symptoms or reason for visit" />
                </div>
                <div>
                  <Label htmlFor="triage">Triage Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select triage level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Register Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patient Queue</TabsTrigger>
            <TabsTrigger value="beds">Bed Management</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <div className="grid gap-6">
              {erPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-gray-600" />
                          {patient.name}
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            ({patient.age}y, {patient.gender})
                          </span>
                        </CardTitle>
                        <CardDescription>ID: {patient.id} • Bed: {patient.bedNumber}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTriageBadge(patient.triage)}
                        <Badge variant="outline" className="capitalize">{patient.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Chief Complaint
                        </h4>
                        <p className="text-sm text-gray-600">{patient.complaint}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Arrival Time
                        </h4>
                        <p className="text-sm text-gray-600">{patient.arrivalTime}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
                          <Activity className="h-4 w-4 mr-1" />
                          Vital Signs
                        </h4>
                        <div className="text-sm text-gray-600">
                          <div>BP: {patient.vitals.bp}</div>
                          <div>HR: {patient.vitals.hr}</div>
                          <div>Temp: {patient.vitals.temp}</div>
                          <div>SpO2: {patient.vitals.spo2}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Stethoscope className="h-4 w-4 mr-1" />
                        View Chart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Thermometer className="h-4 w-4 mr-1" />
                        Update Vitals
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Manage Care
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beds">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {beds.map((bed) => (
                <Card key={bed.number} className={`text-center ${getBedStatusColor(bed.status)}`}>
                  <CardContent className="p-4">
                    <div className="font-semibold text-lg">{bed.number}</div>
                    <div className="text-sm mt-1 capitalize">{bed.status}</div>
                    {bed.patient && (
                      <div className="text-xs mt-2 font-medium">{bed.patient}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
                Available ({beds.filter(b => b.status === 'available').length})
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                Occupied ({beds.filter(b => b.status === 'occupied').length})
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
                Maintenance ({beds.filter(b => b.status === 'maintenance').length})
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Today's Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-red-600">8</div>
                  <div className="text-sm text-gray-600">Total ER Patients</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Critical Cases</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-red-800">1</div>
                  <div className="text-sm text-gray-600">Requiring Immediate Attention</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Average Wait Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}