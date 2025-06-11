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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Bed, 
  Plus,
  Search,
  User,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Activity,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PatientChartModal } from '@/components/patient/patient-chart-modal';
import { TransferPatientModal } from '@/components/admission/transfer-patient-modal';
import { DischargePatientModal } from '@/components/admission/discharge-patient-modal';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const initialAdmittedPatients = [
  {
    id: 'ADM001',
    patientName: 'John Doe',
    patientId: 'P001',
    age: 45,
    gender: 'Male',
    admissionDate: '2024-01-10',
    expectedDischarge: '2024-01-18',
    department: 'Cardiology',
    room: 'A-201',
    bed: 'A-201-1',
    attendingDoctor: 'Dr. Sarah Johnson',
    admissionType: 'emergency',
    diagnosis: 'Acute Myocardial Infarction',
    status: 'stable',
    insurance: 'Blue Cross',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    daysSinceAdmission: 5,
    estimatedCost: 15000
  },
  {
    id: 'ADM002',
    patientName: 'Maria Rodriguez',
    patientId: 'P005',
    age: 38,
    gender: 'Female',
    admissionDate: '2024-01-12',
    expectedDischarge: '2024-01-16',
    department: 'Obstetrics',
    room: 'B-305',
    bed: 'B-305-2',
    attendingDoctor: 'Dr. Emily Davis',
    admissionType: 'planned',
    diagnosis: 'Cesarean Section',
    status: 'recovering',
    insurance: 'Aetna',
    emergencyContact: 'Carlos Rodriguez - +1 (555) 123-9876',
    daysSinceAdmission: 3,
    estimatedCost: 8500
  },
  {
    id: 'ADM003',
    patientName: 'Robert Chen',
    patientId: 'P006',
    age: 62,
    gender: 'Male',
    admissionDate: '2024-01-13',
    expectedDischarge: '2024-01-20',
    department: 'Orthopedics',
    room: 'C-102',
    bed: 'C-102-1',
    attendingDoctor: 'Dr. James Wilson',
    admissionType: 'planned',
    diagnosis: 'Hip Replacement Surgery',
    status: 'post-operative',
    insurance: 'Medicare',
    emergencyContact: 'Linda Chen - +1 (555) 456-7890',
    daysSinceAdmission: 2,
    estimatedCost: 25000
  }
];

const pendingAdmissions = [
  {
    id: 'PEND001',
    patientName: 'Sarah Williams',
    patientId: 'P007',
    scheduledDate: '2024-01-16',
    department: 'Surgery',
    procedure: 'Gallbladder Removal',
    doctor: 'Dr. Michael Brown',
    preAdmissionComplete: true,
    insuranceVerified: true,
    roomAssigned: false
  },
  {
    id: 'PEND002',
    patientName: 'David Thompson',
    patientId: 'P008',
    scheduledDate: '2024-01-17',
    department: 'Cardiology',
    procedure: 'Cardiac Catheterization',
    doctor: 'Dr. Sarah Johnson',
    preAdmissionComplete: false,
    insuranceVerified: true,
    roomAssigned: false
  }
];

const dischargeQueue = [
  {
    id: 'DISC001',
    patientName: 'Alice Johnson',
    patientId: 'P009',
    room: 'A-105',
    dischargeDate: '2024-01-15',
    doctor: 'Dr. Emily Davis',
    status: 'pending-paperwork',
    medications: ['Lisinopril', 'Metformin'],
    followUpRequired: true,
    transportNeeded: false
  },
  {
    id: 'DISC002',
    patientName: 'Michael Brown',
    patientId: 'P010',
    room: 'B-203',
    dischargeDate: '2024-01-15',
    doctor: 'Dr. James Wilson',
    status: 'ready',
    medications: ['Ibuprofen', 'Physical Therapy'],
    followUpRequired: true,
    transportNeeded: true
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'stable':
      return <Badge className="bg-green-500 hover:bg-green-600">Stable</Badge>;
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'recovering':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Recovering</Badge>;
    case 'post-operative':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Post-Op</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getAdmissionTypeBadge = (type: string) => {
  switch (type) {
    case 'emergency':
      return <Badge variant="destructive">Emergency</Badge>;
    case 'planned':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Planned</Badge>;
    case 'transfer':
      return <Badge className="bg-purple-500 hover:bg-purple-600">Transfer</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getDischargeStatusBadge = (status: string) => {
  switch (status) {
    case 'pending-paperwork':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending Paperwork</Badge>;
    case 'ready':
      return <Badge className="bg-green-500 hover:bg-green-600">Ready</Badge>;
    case 'waiting-transport':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Waiting Transport</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function AdmissionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [admittedPatients, setAdmittedPatients] = useState(initialAdmittedPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDischargeModal, setShowDischargeModal] = useState(false);

  const filteredPatients = admittedPatients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewChart = (patient: any) => {
    setSelectedPatient(patient);
    setShowChart(true);
  };

  const handleTransfer = (patient: any) => {
    setSelectedPatient(patient);
    setShowTransferModal(true);
  };

  const handleDischarge = (patient: any) => {
    setSelectedPatient(patient);
    setShowDischargeModal(true);
  };

  const handleTransferComplete = (transferData: any) => {
    console.log('Transfer completed:', transferData);
    alert(`Transfer initiated for ${transferData.patientName}`);
  };

  const handleDischargeComplete = (dischargeData: any) => {
    console.log('Discharge completed:', dischargeData);
    // Remove patient from admitted patients list
    setAdmittedPatients(prev => 
      prev.filter(p => p.id !== dischargeData.patientId)
    );
    alert(`${dischargeData.patientName} has been successfully discharged`);
  };

  const handleNewAdmission = (admissionData: any) => {
    console.log('New admission:', admissionData);
    alert('New patient admission recorded successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Bed className="h-8 w-8 mr-3 text-indigo-600" />
              Patient Admission
            </h1>
            <p className="text-gray-600">Manage patient admissions, discharges, and bed assignments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Admission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Admit New Patient</DialogTitle>
                <DialogDescription>Register a new patient admission</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientSearch">Patient</Label>
                  <Input id="patientSearch" placeholder="Search patient by name or ID" />
                </div>
                <div>
                  <Label htmlFor="admissionType">Admission Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="doctor">Attending Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="dr-davis">Dr. Emily Davis</SelectItem>
                      <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Admission Date</Label>
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
                  <Label htmlFor="room">Room Assignment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A-201">A-201 (Available)</SelectItem>
                      <SelectItem value="A-202">A-202 (Available)</SelectItem>
                      <SelectItem value="B-105">B-105 (Available)</SelectItem>
                      <SelectItem value="C-301">C-301 (Available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="diagnosis">Primary Diagnosis</Label>
                  <Textarea id="diagnosis" placeholder="Enter primary diagnosis or reason for admission" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="insurance">Insurance Information</Label>
                  <Input id="insurance" placeholder="Insurance provider and policy number" />
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleNewAdmission({})}
                  >
                    Admit Patient
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">Current Admissions</TabsTrigger>
            <TabsTrigger value="pending">Pending Admissions</TabsTrigger>
            <TabsTrigger value="discharge">Discharge Queue</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search admitted patients..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredPatients.length} patients currently admitted
                </div>
              </div>

              <div className="grid gap-6">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="bg-indigo-100 p-3 rounded-full">
                            <User className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg text-gray-900">{patient.patientName}</h3>
                              {getStatusBadge(patient.status)}
                              {getAdmissionTypeBadge(patient.admissionType)}
                            </div>
                            <p className="text-sm text-gray-600">
                              ID: {patient.patientId} • {patient.age} years old, {patient.gender}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>Room: {patient.room}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Activity className="h-4 w-4" />
                                <span>Dept: {patient.department}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <CalendarIcon className="h-4 w-4" />
                                <span>Day {patient.daysSinceAdmission}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Est. Discharge: {patient.expectedDischarge}</span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Diagnosis:</span> {patient.diagnosis}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Attending:</span> {patient.attendingDoctor}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Insurance:</span> {patient.insurance}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <div className="text-lg font-semibold text-gray-900">
                            ${patient.estimatedCost.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Estimated Cost</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewChart(patient)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Chart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTransfer(patient)}
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Transfer
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleDischarge(patient)}
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Discharge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Scheduled Admissions</h3>
                <div className="text-sm text-gray-600">
                  {pendingAdmissions.length} pending admissions
                </div>
              </div>

              <div className="grid gap-4">
                {pendingAdmissions.map((admission) => (
                  <Card key={admission.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{admission.patientName}</h3>
                          <p className="text-sm text-gray-600">
                            ID: {admission.patientId} • {admission.department}
                          </p>
                          <p className="text-sm text-gray-600">
                            Procedure: {admission.procedure}
                          </p>
                          <p className="text-sm text-gray-600">
                            Doctor: {admission.doctor}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{admission.scheduledDate}</p>
                          <div className="flex space-x-2 mt-2">
                            {admission.preAdmissionComplete ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Pre-admission</span>
                          </div>
                          <div className="flex space-x-2">
                            {admission.insuranceVerified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Insurance</span>
                          </div>
                          <div className="flex space-x-2">
                            {admission.roomAssigned ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">Room</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          Complete Pre-admission
                        </Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          Assign Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discharge">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Discharge Queue</h3>
                <div className="text-sm text-gray-600">
                  {dischargeQueue.length} patients ready for discharge
                </div>
              </div>

              <div className="grid gap-4">
                {dischargeQueue.map((discharge) => (
                  <Card key={discharge.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{discharge.patientName}</h3>
                            {getDischargeStatusBadge(discharge.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            ID: {discharge.patientId} • Room: {discharge.room}
                          </p>
                          <p className="text-sm text-gray-600">
                            Doctor: {discharge.doctor}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Medications:</span> {discharge.medications.join(', ')}
                            </p>
                            <div className="flex items-center space-x-4 mt-1 text-sm">
                              <div className="flex items-center space-x-1">
                                {discharge.followUpRequired ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-gray-400" />
                                )}
                                <span>Follow-up Required</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {discharge.transportNeeded ? (
                                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                <span>Transport {discharge.transportNeeded ? 'Needed' : 'Not Required'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{discharge.dischargeDate}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        {discharge.status === 'pending-paperwork' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Complete Paperwork
                          </Button>
                        )}
                        {discharge.status === 'ready' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Discharge Patient
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Current Occupancy</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-indigo-600">85%</div>
                  <div className="text-sm text-gray-600">124 of 146 beds occupied</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Average Length of Stay</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">4.2</div>
                  <div className="text-sm text-gray-600">Days</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Pending Discharges</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">{dischargeQueue.length}</div>
                  <div className="text-sm text-gray-600">Patients ready for discharge</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Patient Chart Modal */}
        <PatientChartModal
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          patient={selectedPatient}
        />

        {/* Transfer Patient Modal */}
        <TransferPatientModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          patient={selectedPatient}
          onTransfer={handleTransferComplete}
        />

        {/* Discharge Patient Modal */}
        <DischargePatientModal
          isOpen={showDischargeModal}
          onClose={() => setShowDischargeModal(false)}
          patient={selectedPatient}
          onDischarge={handleDischargeComplete}
        />
      </div>
    </DashboardLayout>
  );
}