'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Search, 
  User, 
  Bed,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface AssignPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
  onAssign: (assignmentData: any) => void;
}

// Mock available patients for assignment
const availablePatients = [
  {
    id: 'P013',
    name: 'Alice Johnson',
    age: 34,
    gender: 'Female',
    condition: 'Stable',
    department: 'General Medicine',
    priority: 'routine',
    admissionType: 'planned',
    allergies: ['Penicillin'],
    notes: 'Scheduled for routine procedure'
  },
  {
    id: 'P014',
    name: 'Robert Davis',
    age: 67,
    gender: 'Male',
    condition: 'Monitoring',
    department: 'Cardiology',
    priority: 'urgent',
    admissionType: 'emergency',
    allergies: [],
    notes: 'Requires cardiac monitoring'
  },
  {
    id: 'P015',
    name: 'Maria Garcia',
    age: 29,
    gender: 'Female',
    condition: 'Recovery',
    department: 'Surgery',
    priority: 'routine',
    admissionType: 'planned',
    allergies: ['Latex'],
    notes: 'Post-operative recovery'
  }
];

export function AssignPatientModal({ isOpen, onClose, room, onAssign }: AssignPatientModalProps) {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [assignmentType, setAssignmentType] = useState('admission');

  const filteredPatients = availablePatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatientData = availablePatients.find(p => p.id === selectedPatient);

  const handleAssign = () => {
    if (!selectedPatient || !bedNumber) return;

    const assignmentData = {
      patientId: selectedPatient,
      patientName: selectedPatientData?.name,
      roomId: room.id,
      bedNumber,
      assignmentType,
      notes: assignmentNotes,
      assignedAt: new Date().toISOString(),
      assignedBy: 'Current User' // In real app, get from auth context
    };

    onAssign(assignmentData);
    
    // Reset form
    setSelectedPatient('');
    setSearchTerm('');
    setBedNumber('');
    setAssignmentNotes('');
    setAssignmentType('admission');
    onClose();
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'routine':
        return <Badge variant="secondary">Routine</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Assign Patient to Room {room.id}</span>
          </DialogTitle>
          <DialogDescription>
            Select a patient to assign to this {room.type} room
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Information */}
          <Card className="bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <Bed className="h-4 w-4" />
                <span>Room Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Room:</span>
                  <p>{room.id}</p>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <p>{room.type}</p>
                </div>
                <div>
                  <span className="font-medium">Department:</span>
                  <p>{room.department}</p>
                </div>
                <div>
                  <span className="font-medium">Bed Capacity:</span>
                  <p>{room.beds} bed(s)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Search */}
          <div>
            <Label htmlFor="patientSearch">Search Available Patients</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="patientSearch"
                placeholder="Search by name, ID, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Patient Selection */}
          <div>
            <Label>Select Patient</Label>
            <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedPatient === patient.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{patient.name}</h4>
                          <p className="text-sm text-gray-600">
                            ID: {patient.id} • {patient.age}y {patient.gender}
                          </p>
                          <p className="text-sm text-gray-600">Department: {patient.department}</p>
                          {patient.allergies.length > 0 && (
                            <div className="flex items-center space-x-1 mt-1">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              <span className="text-xs text-red-600">
                                Allergies: {patient.allergies.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {getPriorityBadge(patient.priority)}
                        <Badge variant="outline" className="text-xs">
                          {patient.admissionType}
                        </Badge>
                      </div>
                    </div>
                    {patient.notes && (
                      <p className="text-sm text-gray-600 mt-2 pl-11">{patient.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No patients found matching your search</p>
              </div>
            )}
          </div>

          {/* Assignment Details */}
          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedNumber">Bed Number</Label>
                    <Select value={bedNumber} onValueChange={setBedNumber}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bed" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: room.beds }, (_, i) => (
                          <SelectItem key={i + 1} value={`${room.id}-${i + 1}`}>
                            Bed {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="assignmentType">Assignment Type</Label>
                    <Select value={assignmentType} onValueChange={setAssignmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admission">New Admission</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="readmission">Readmission</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignmentNotes">Assignment Notes</Label>
                  <Textarea
                    id="assignmentNotes"
                    value={assignmentNotes}
                    onChange={(e) => setAssignmentNotes(e.target.value)}
                    placeholder="Any special instructions or notes for this assignment..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assignment Summary */}
          {selectedPatient && bedNumber && (
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-base">Assignment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Patient:</span>
                    <span>{selectedPatientData?.name} ({selectedPatient})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Room:</span>
                    <span>{room.id} - {room.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Bed:</span>
                    <span>{bedNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Assignment Type:</span>
                    <span className="capitalize">{assignmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date & Time:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedPatient || !bedNumber}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Assign Patient
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}