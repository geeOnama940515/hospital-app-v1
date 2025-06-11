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
  Stethoscope, 
  Plus,
  Search,
  Thermometer,
  Activity,
  Heart,
  User,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PatientChartModal } from '@/components/patient/patient-chart-modal';
import { RecordVitalsModal } from '@/components/vitals/record-vitals-modal';

const patients = [
  {
    id: 'P001',
    name: 'John Doe',
    room: 'A-201',
    age: 45,
    gender: 'Male',
    condition: 'Post-operative care',
    lastVitals: {
      temperature: '98.6°F',
      bloodPressure: '120/80',
      heartRate: '75 bpm',
      oxygenSaturation: '98%',
      respiratoryRate: '16/min',
      recordedAt: '10:30 AM'
    },
    medications: [
      { name: 'Morphine', dose: '5mg', time: '12:00 PM', status: 'due' },
      { name: 'Antibiotics', dose: '500mg', time: '2:00 PM', status: 'given' }
    ],
    notes: 'Patient recovering well. No complications observed.',
    nurseAssigned: 'Jennifer Smith'
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    room: 'A-205',
    age: 32,
    gender: 'Female',
    condition: 'Pneumonia treatment',
    lastVitals: {
      temperature: '101.2°F',
      bloodPressure: '110/70',
      heartRate: '88 bpm',
      oxygenSaturation: '95%',
      respiratoryRate: '20/min',
      recordedAt: '11:00 AM'
    },
    medications: [
      { name: 'Azithromycin', dose: '250mg', time: '1:00 PM', status: 'due' },
      { name: 'Albuterol', dose: '2 puffs', time: '1:30 PM', status: 'due' }
    ],
    notes: 'Fever persisting. Respiratory symptoms improving.',
    nurseAssigned: 'Jennifer Smith'
  },
  {
    id: 'P003',
    name: 'Michael Brown',
    room: 'B-105',
    age: 58,
    gender: 'Male',
    condition: 'Joint replacement surgery',
    lastVitals: {
      temperature: '98.4°F',
      bloodPressure: '130/85',
      heartRate: '70 bpm',
      oxygenSaturation: '99%',
      respiratoryRate: '14/min',
      recordedAt: '9:45 AM'
    },
    medications: [
      { name: 'Ibuprofen', dose: '400mg', time: '12:30 PM', status: 'given' },
      { name: 'Physical therapy', dose: 'Session', time: '3:00 PM', status: 'scheduled' }
    ],
    notes: 'Good mobility progress. Pain management effective.',
    nurseAssigned: 'Maria Rodriguez'
  }
];

const nursingTasks = [
  {
    id: 'T001',
    patientId: 'P001',
    patientName: 'John Doe',
    task: 'Administer pain medication',
    priority: 'high',
    dueTime: '12:00 PM',
    status: 'pending',
    assignedTo: 'Jennifer Smith'
  },
  {
    id: 'T002',
    patientId: 'P002',
    patientName: 'Sarah Johnson',
    task: 'Check vital signs',
    priority: 'medium',
    dueTime: '1:00 PM',
    status: 'pending',
    assignedTo: 'Jennifer Smith'
  },
  {
    id: 'T003',
    patientId: 'P001',
    patientName: 'John Doe',
    task: 'Wound dressing change',
    priority: 'medium',
    dueTime: '2:00 PM',
    status: 'pending',
    assignedTo: 'Jennifer Smith'
  },
  {
    id: 'T004',
    patientId: 'P003',
    patientName: 'Michael Brown',
    task: 'Assist with mobility',
    priority: 'low',
    dueTime: '3:30 PM',
    status: 'completed',
    assignedTo: 'Maria Rodriguez'
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
    case 'low':
      return <Badge variant="secondary">Low</Badge>;
    default:
      return <Badge variant="outline">Normal</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getMedicationStatusBadge = (status: string) => {
  switch (status) {
    case 'due':
      return <Badge className="bg-orange-500 hover:bg-orange-600">Due</Badge>;
    case 'given':
      return <Badge className="bg-green-500 hover:bg-green-600">Given</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    case 'scheduled':
      return <Badge variant="outline">Scheduled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function NursingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [showVitalsModal, setShowVitalsModal] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewChart = (patient: any) => {
    setSelectedPatient(patient);
    setShowChart(true);
  };

  const handleSaveVitals = (vitalsData: any) => {
    console.log('Saving vitals:', vitalsData);
    // In a real app, this would save to the database
    alert('Vital signs recorded successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Stethoscope className="h-8 w-8 mr-3 text-teal-600" />
              Nurse Charting
            </h1>
            <p className="text-gray-600">Monitor patient care and document nursing activities</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setShowVitalsModal(true)}
            >
              <Thermometer className="h-4 w-4 mr-2" />
              Record Vitals
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patient Care</TabsTrigger>
            <TabsTrigger value="tasks">Nursing Tasks</TabsTrigger>
            <TabsTrigger value="medications">Medication Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
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
                  {filteredPatients.length} patients under care
                </div>
              </div>

              <div className="grid gap-6">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-teal-100 p-3 rounded-full">
                            <User className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
                            <p className="text-sm text-gray-600">
                              Room {patient.room} • {patient.age}y {patient.gender} • {patient.condition}
                            </p>
                            <p className="text-sm text-gray-600">
                              Assigned Nurse: {patient.nurseAssigned}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button 
                            size="sm" 
                            className="bg-teal-600 hover:bg-teal-700"
                            onClick={() => handleViewChart(patient)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Chart
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Vital Signs */}
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center">
                              <Activity className="h-4 w-4 mr-2" />
                              Latest Vitals
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Recorded at {patient.lastVitals.recordedAt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <Thermometer className="h-4 w-4 text-red-500" />
                                <span>Temp: {patient.lastVitals.temperature}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Heart className="h-4 w-4 text-red-500" />
                                <span>HR: {patient.lastVitals.heartRate}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                <span>BP: {patient.lastVitals.bloodPressure}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-green-600">O2:</span>
                                <span>{patient.lastVitals.oxygenSaturation}</span>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => setShowVitalsModal(true)}
                            >
                              <Thermometer className="h-4 w-4 mr-1" />
                              Update Vitals
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Medications */}
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Medications</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {patient.medications.map((med, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <div>
                                  <p className="font-medium">{med.name}</p>
                                  <p className="text-gray-600">{med.dose} at {med.time}</p>
                                </div>
                                {getMedicationStatusBadge(med.status)}
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Medication
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Notes */}
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-2">Latest Notes</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {patient.notes}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <FileText className="h-4 w-4 mr-1" />
                          Add Note
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Today's Nursing Tasks</h3>
                <div className="text-sm text-gray-600">
                  {nursingTasks.filter(t => t.status === 'pending').length} pending tasks
                </div>
              </div>

              <div className="grid gap-4">
                {nursingTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span className="text-xs text-gray-600 mt-1">{task.dueTime}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{task.task}</h4>
                            <p className="text-sm text-gray-600">
                              {task.patientName} • Assigned to: {task.assignedTo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                          {task.status === 'pending' && (
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Medication Schedule</h3>
                <div className="text-sm text-gray-600">Current time: 12:45 PM</div>
              </div>

              <div className="grid gap-4">
                {patients.map((patient) => (
                  <Card key={patient.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {patient.name} - Room {patient.room}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {patient.medications.map((med, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium">{med.name}</p>
                              <p className="text-sm text-gray-600">{med.dose} at {med.time}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getMedicationStatusBadge(med.status)}
                              {med.status === 'due' && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Mark Given
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Patient Chart Modal */}
        <PatientChartModal
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          patient={selectedPatient}
        />

        {/* Record Vitals Modal */}
        <RecordVitalsModal
          isOpen={showVitalsModal}
          onClose={() => setShowVitalsModal(false)}
          patients={patients}
          onSave={handleSaveVitals}
        />
      </div>
    </DashboardLayout>
  );
}