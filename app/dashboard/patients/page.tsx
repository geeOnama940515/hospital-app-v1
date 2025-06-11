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
  FileText, 
  Plus,
  Search,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Heart,
  Activity
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PatientChartModal } from '@/components/patient/patient-chart-modal';
import { EditPatientModal } from '@/components/patient/edit-patient-modal';

const initialPatients = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State 12345',
    bloodGroup: 'A+',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    admissionDate: '2024-01-10',
    status: 'admitted',
    department: 'Cardiology',
    room: 'A-201',
    allergies: ['Penicillin', 'Shellfish'],
    conditions: ['Hypertension', 'Type 2 Diabetes']
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    phone: '+1 (555) 234-5678',
    email: 'sarah.johnson@email.com',
    address: '456 Oak Ave, City, State 12345',
    bloodGroup: 'O-',
    emergencyContact: 'Mike Johnson - +1 (555) 876-5432',
    admissionDate: null,
    status: 'outpatient',
    department: 'Dermatology',
    room: null,
    allergies: ['Latex'],
    conditions: ['Eczema']
  },
  {
    id: 'P003',
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    email: 'michael.brown@email.com',
    address: '789 Pine Rd, City, State 12345',
    bloodGroup: 'B+',
    emergencyContact: 'Lisa Brown - +1 (555) 765-4321',
    admissionDate: '2024-01-12',
    status: 'admitted',
    department: 'Orthopedics',
    room: 'B-105',
    allergies: [],
    conditions: ['Arthritis', 'High Cholesterol']
  },
  {
    id: 'P004',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    phone: '+1 (555) 456-7890',
    email: 'emily.davis@email.com',
    address: '321 Elm St, City, State 12345',
    bloodGroup: 'AB+',
    emergencyContact: 'David Davis - +1 (555) 654-3210',
    admissionDate: null,
    status: 'discharged',
    department: 'Emergency',
    room: null,
    allergies: ['Aspirin'],
    conditions: []
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'admitted':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Admitted</Badge>;
    case 'outpatient':
      return <Badge className="bg-green-500 hover:bg-green-600">Outpatient</Badge>;
    case 'discharged':
      return <Badge variant="secondary">Discharged</Badge>;
    case 'emergency':
      return <Badge variant="destructive">Emergency</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewChart = (patient: any) => {
    setSelectedPatient(patient);
    setShowChart(true);
  };

  const handleEditInfo = (patient: any) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleSavePatient = (updatedPatient: any) => {
    setPatients(prev => 
      prev.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <FileText className="h-8 w-8 mr-3 text-purple-600" />
              Patient Information System
            </h1>
            <p className="text-gray-600">Manage patient records and medical information</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
                <DialogDescription>Add a new patient to the system</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
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
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="patient@email.com" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Full address" />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" placeholder="Name - Phone" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Input id="allergies" placeholder="Separate with commas" />
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Register Patient</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="admitted">Admitted</TabsTrigger>
            <TabsTrigger value="outpatient">Outpatients</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredPatients.length} patients found
                </div>
              </div>

              <div className="grid gap-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="bg-purple-100 p-3 rounded-full">
                            <User className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
                              {getStatusBadge(patient.status)}
                            </div>
                            <p className="text-sm text-gray-600">
                              ID: {patient.id} • {patient.age} years old, {patient.gender}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{patient.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span>{patient.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Heart className="h-4 w-4" />
                                <span>Blood: {patient.bloodGroup}</span>
                              </div>
                              {patient.room && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <MapPin className="h-4 w-4" />
                                  <span>Room: {patient.room}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Activity className="h-4 w-4" />
                                <span>Dept: {patient.department}</span>
                              </div>
                              {patient.admissionDate && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Admitted: {patient.admissionDate}</span>
                                </div>
                              )}
                            </div>

                            {patient.allergies.length > 0 && (
                              <div className="mt-3 flex items-center space-x-2">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-600 font-medium">
                                  Allergies: {patient.allergies.join(', ')}
                                </span>
                              </div>
                            )}

                            {patient.conditions.length > 0 && (
                              <div className="mt-2">
                                <span className="text-sm text-gray-600">
                                  Conditions: {patient.conditions.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleViewChart(patient)}
                          >
                            View Chart
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditInfo(patient)}
                          >
                            Edit Info
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admitted">
            <div className="grid gap-4">
              {patients.filter(p => p.status === 'admitted').map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          Room {patient.room} • {patient.department}
                        </p>
                        <p className="text-sm text-gray-600">
                          Admitted: {patient.admissionDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-500 hover:bg-blue-600">Admitted</Badge>
                        <p className="text-sm text-gray-600 mt-1">Day 5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outpatient">
            <div className="grid gap-4">
              {patients.filter(p => p.status === 'outpatient').map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-sm text-gray-600">{patient.department}</p>
                        <p className="text-sm text-gray-600">Next appointment: Jan 20, 2024</p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">Outpatient</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Patients</CardTitle>
                <CardDescription>Patients requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No emergency patients at the moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Patient Chart Modal */}
        <PatientChartModal
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          patient={selectedPatient}
        />

        {/* Edit Patient Modal */}
        <EditPatientModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          patient={selectedPatient}
          onSave={handleSavePatient}
        />
      </div>
    </DashboardLayout>
  );
}