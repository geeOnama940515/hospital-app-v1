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
  ArrowRight,
  MapPin,
  User,
  Activity
} from 'lucide-react';

interface TransferPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  onTransfer: (transferData: any) => void;
}

export function TransferPatientModal({ isOpen, onClose, patient, onTransfer }: TransferPatientModalProps) {
  const [formData, setFormData] = useState({
    fromDepartment: patient?.department || '',
    toDepartment: '',
    fromRoom: patient?.room || '',
    toRoom: '',
    transferReason: '',
    transferType: 'internal',
    urgency: 'routine',
    notes: '',
    requestedBy: '',
    approvedBy: ''
  });

  const departments = [
    'Emergency',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Surgery',
    'ICU',
    'Pediatrics',
    'Obstetrics',
    'Oncology',
    'Psychiatry'
  ];

  const availableRooms = [
    'A-101', 'A-102', 'A-103', 'A-201', 'A-202', 'A-203',
    'B-101', 'B-102', 'B-103', 'B-201', 'B-202', 'B-203',
    'C-101', 'C-102', 'C-103', 'C-201', 'C-202', 'C-203',
    'ICU-1', 'ICU-2', 'ICU-3', 'ICU-4'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransfer = () => {
    const transferData = {
      ...formData,
      patientId: patient.id,
      patientName: patient.patientName,
      transferDate: new Date().toISOString(),
      status: 'pending'
    };
    onTransfer(transferData);
    onClose();
  };

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Transfer Patient</span>
          </DialogTitle>
          <DialogDescription>
            Transfer {patient.patientName} to a different department or room
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <Card className="bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <p>{patient.patientName}</p>
                </div>
                <div>
                  <span className="font-medium">Patient ID:</span>
                  <p>{patient.patientId}</p>
                </div>
                <div>
                  <span className="font-medium">Current Department:</span>
                  <p>{patient.department}</p>
                </div>
                <div>
                  <span className="font-medium">Current Room:</span>
                  <p>{patient.room}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transferType">Transfer Type</Label>
              <Select value={formData.transferType} onValueChange={(value) => handleInputChange('transferType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transfer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal Transfer</SelectItem>
                  <SelectItem value="external">External Transfer</SelectItem>
                  <SelectItem value="discharge">Discharge Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* From/To Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>From</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Department</Label>
                  <Input value={formData.fromDepartment} disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label>Room</Label>
                  <Input value={formData.fromRoom} disabled className="bg-gray-100" />
                </div>
              </CardContent>
            </Card>

            {/* To */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span>To</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="toDepartment">Department</Label>
                  <Select value={formData.toDepartment} onValueChange={(value) => handleInputChange('toDepartment', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(dept => dept !== formData.fromDepartment).map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="toRoom">Room</Label>
                  <Select value={formData.toRoom} onValueChange={(value) => handleInputChange('toRoom', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRooms.filter(room => room !== formData.fromRoom).map(room => (
                        <SelectItem key={room} value={room}>{room} (Available)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transfer Reason */}
          <div>
            <Label htmlFor="transferReason">Reason for Transfer</Label>
            <Select value={formData.transferReason} onValueChange={(value) => handleInputChange('transferReason', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical-necessity">Medical Necessity</SelectItem>
                <SelectItem value="bed-availability">Bed Availability</SelectItem>
                <SelectItem value="specialized-care">Specialized Care Required</SelectItem>
                <SelectItem value="patient-request">Patient Request</SelectItem>
                <SelectItem value="isolation">Isolation Requirements</SelectItem>
                <SelectItem value="step-down">Step Down Care</SelectItem>
                <SelectItem value="discharge-planning">Discharge Planning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Authorization */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requestedBy">Requested By</Label>
              <Input
                id="requestedBy"
                value={formData.requestedBy}
                onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                placeholder="Doctor/Nurse name"
              />
            </div>
            <div>
              <Label htmlFor="approvedBy">Approved By</Label>
              <Input
                id="approvedBy"
                value={formData.approvedBy}
                onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                placeholder="Supervisor/Doctor name"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Transfer Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about the transfer..."
              rows={3}
            />
          </div>

          {/* Transfer Summary */}
          {formData.toDepartment && formData.toRoom && (
            <Card className="bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <p className="font-medium">{formData.fromDepartment}</p>
                    <p className="text-gray-600">{formData.fromRoom}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <div className="text-center">
                    <p className="font-medium">{formData.toDepartment}</p>
                    <p className="text-gray-600">{formData.toRoom}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-center">
                  <Badge variant={formData.urgency === 'emergency' ? 'destructive' : 
                                formData.urgency === 'urgent' ? 'secondary' : 'default'}>
                    {formData.urgency} Transfer
                  </Badge>
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
              onClick={handleTransfer} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.toDepartment || !formData.toRoom || !formData.transferReason}
            >
              Initiate Transfer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}