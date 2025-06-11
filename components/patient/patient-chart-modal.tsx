'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Pill, 
  FileText, 
  AlertTriangle,
  Plus,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface PatientChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
}

export function PatientChartModal({ isOpen, onClose, patient }: PatientChartModalProps) {
  const [newNote, setNewNote] = useState('');

  if (!patient) return null;

  const vitalsHistory = [
    {
      date: '2024-01-15 10:30',
      temperature: '98.6°F',
      bloodPressure: '120/80',
      heartRate: '75 bpm',
      oxygenSaturation: '98%',
      respiratoryRate: '16/min',
      recordedBy: 'Nurse Jennifer Smith'
    },
    {
      date: '2024-01-15 06:00',
      temperature: '99.1°F',
      bloodPressure: '125/82',
      heartRate: '78 bpm',
      oxygenSaturation: '97%',
      respiratoryRate: '18/min',
      recordedBy: 'Nurse Maria Rodriguez'
    },
    {
      date: '2024-01-14 22:00',
      temperature: '98.8°F',
      bloodPressure: '118/76',
      heartRate: '72 bpm',
      oxygenSaturation: '99%',
      respiratoryRate: '15/min',
      recordedBy: 'Nurse Jennifer Smith'
    }
  ];

  const medications = [
    {
      name: 'Lisinopril 10mg',
      dosage: '1 tablet daily',
      startDate: '2024-01-10',
      prescribedBy: 'Dr. Sarah Johnson',
      status: 'active'
    },
    {
      name: 'Metformin 500mg',
      dosage: '1 tablet twice daily with meals',
      startDate: '2024-01-10',
      prescribedBy: 'Dr. Sarah Johnson',
      status: 'active'
    },
    {
      name: 'Aspirin 81mg',
      dosage: '1 tablet daily',
      startDate: '2024-01-10',
      prescribedBy: 'Dr. Sarah Johnson',
      status: 'active'
    }
  ];

  const labResults = [
    {
      test: 'Complete Blood Count',
      date: '2024-01-14',
      results: 'WBC: 7.2, RBC: 4.5, Hemoglobin: 14.2 g/dL',
      status: 'normal',
      orderedBy: 'Dr. Sarah Johnson'
    },
    {
      test: 'Basic Metabolic Panel',
      date: '2024-01-14',
      results: 'Glucose: 95 mg/dL, Creatinine: 1.0 mg/dL, BUN: 18 mg/dL',
      status: 'normal',
      orderedBy: 'Dr. Sarah Johnson'
    },
    {
      test: 'Lipid Panel',
      date: '2024-01-13',
      results: 'Total Cholesterol: 180 mg/dL, LDL: 110 mg/dL, HDL: 45 mg/dL',
      status: 'borderline',
      orderedBy: 'Dr. Sarah Johnson'
    }
  ];

  const nursingNotes = [
    {
      date: '2024-01-15 14:30',
      note: 'Patient ambulating well. No complaints of pain. Appetite good. Vital signs stable.',
      nurse: 'Jennifer Smith, RN',
      type: 'routine'
    },
    {
      date: '2024-01-15 10:00',
      note: 'Patient reports mild chest discomfort. Administered prescribed nitroglycerin. Symptoms resolved within 5 minutes.',
      nurse: 'Jennifer Smith, RN',
      type: 'incident'
    },
    {
      date: '2024-01-15 06:00',
      note: 'Night shift report: Patient slept well. No incidents overnight. Morning medications administered.',
      nurse: 'Maria Rodriguez, RN',
      type: 'routine'
    }
  ];

  const addNote = () => {
    if (newNote.trim()) {
      // In a real app, this would save to the database
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Patient Chart - {patient.name}</span>
          </DialogTitle>
          <DialogDescription>
            Complete medical record and chart for {patient.name} (ID: {patient.id})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Age:</span>
                  <p className="text-gray-600">{patient.age} years</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Gender:</span>
                  <p className="text-gray-600">{patient.gender}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Blood Group:</span>
                  <p className="text-gray-600">{patient.bloodGroup || 'A+'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Room:</span>
                  <p className="text-gray-600">{patient.room || 'N/A'}</p>
                </div>
                {patient.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{patient.phone}</span>
                  </div>
                )}
                {patient.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{patient.email}</span>
                  </div>
                )}
                {patient.allergies && patient.allergies.length > 0 && (
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-600">Allergies:</span>
                      <span className="text-red-600">{patient.allergies.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="vitals" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="labs">Lab Results</TabsTrigger>
              <TabsTrigger value="notes">Nursing Notes</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Vital Signs History</span>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Record Vitals
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vitalsHistory.map((vital, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">{vital.date}</h4>
                          <span className="text-sm text-gray-600">Recorded by: {vital.recordedBy}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <div>
                              <p className="font-medium">Temperature</p>
                              <p className="text-gray-600">{vital.temperature}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <div>
                              <p className="font-medium">Heart Rate</p>
                              <p className="text-gray-600">{vital.heartRate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="font-medium">Blood Pressure</p>
                              <p className="text-gray-600">{vital.bloodPressure}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Oxygen Saturation</p>
                            <p className="text-gray-600">{vital.oxygenSaturation}</p>
                          </div>
                          <div>
                            <p className="font-medium">Respiratory Rate</p>
                            <p className="text-gray-600">{vital.respiratoryRate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Pill className="h-5 w-5" />
                      <span>Current Medications</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Medication
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medications.map((med, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{med.name}</h4>
                            <p className="text-sm text-gray-600">{med.dosage}</p>
                            <p className="text-sm text-gray-600">Started: {med.startDate}</p>
                            <p className="text-sm text-gray-600">Prescribed by: {med.prescribedBy}</p>
                          </div>
                          <Badge className="bg-green-500 hover:bg-green-600">
                            {med.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Laboratory Results</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Order Lab
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {labResults.map((lab, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{lab.test}</h4>
                            <p className="text-sm text-gray-600 mt-1">{lab.results}</p>
                            <p className="text-sm text-gray-600">Date: {lab.date}</p>
                            <p className="text-sm text-gray-600">Ordered by: {lab.orderedBy}</p>
                          </div>
                          <Badge variant={lab.status === 'normal' ? 'default' : 'secondary'}>
                            {lab.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Nursing Notes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add new note */}
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <Label htmlFor="newNote" className="text-sm font-medium">Add New Note</Label>
                      <Textarea
                        id="newNote"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Enter nursing note..."
                        className="mt-2"
                      />
                      <Button 
                        onClick={addNote}
                        size="sm" 
                        className="mt-2 bg-blue-600 hover:bg-blue-700"
                      >
                        Add Note
                      </Button>
                    </div>

                    {/* Existing notes */}
                    {nursingNotes.map((note, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{note.date}</h4>
                          <Badge variant={note.type === 'incident' ? 'destructive' : 'secondary'}>
                            {note.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{note.note}</p>
                        <p className="text-sm text-gray-600">- {note.nurse}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Medical History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Current Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions?.map((condition: string, index: number) => (
                          <Badge key={index} variant="outline">{condition}</Badge>
                        )) || <span className="text-gray-500">No current conditions recorded</span>}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Previous Admissions</h4>
                      <div className="text-sm text-gray-600">
                        <p>• 2023-08-15: Routine checkup - Dr. Sarah Johnson</p>
                        <p>• 2023-03-22: Hypertension management - Dr. Michael Brown</p>
                        <p>• 2022-11-10: Annual physical examination - Dr. Sarah Johnson</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Family History</h4>
                      <div className="text-sm text-gray-600">
                        <p>• Father: Diabetes Type 2, Hypertension</p>
                        <p>• Mother: Breast cancer (survivor)</p>
                        <p>• Siblings: No significant medical history</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}