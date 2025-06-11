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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  LogOut,
  User,
  Calendar,
  FileText,
  Pill,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface DischargePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  onDischarge: (dischargeData: any) => void;
}

export function DischargePatientModal({ isOpen, onClose, patient, onDischarge }: DischargePatientModalProps) {
  const [formData, setFormData] = useState({
    dischargeDate: new Date().toISOString().split('T')[0],
    dischargeTime: new Date().toTimeString().slice(0, 5),
    dischargeType: '',
    dischargeDestination: '',
    dischargingPhysician: '',
    finalDiagnosis: '',
    dischargeMedications: '',
    followUpInstructions: '',
    followUpAppointment: '',
    transportRequired: false,
    transportType: '',
    dischargeNotes: '',
    patientEducation: false,
    medicationReconciliation: false,
    followUpScheduled: false,
    dischargeSummaryProvided: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDischarge = () => {
    const dischargeData = {
      ...formData,
      patientId: patient.id,
      patientName: patient.patientName,
      dischargeDateTime: `${formData.dischargeDate}T${formData.dischargeTime}`,
      status: 'discharged'
    };
    onDischarge(dischargeData);
    onClose();
  };

  const isFormComplete = () => {
    return formData.dischargeType && 
           formData.dischargeDestination && 
           formData.dischargingPhysician && 
           formData.finalDiagnosis &&
           formData.patientEducation &&
           formData.medicationReconciliation &&
           formData.dischargeSummaryProvided;
  };

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <LogOut className="h-5 w-5" />
            <span>Discharge Patient</span>
          </DialogTitle>
          <DialogDescription>
            Complete discharge process for {patient.patientName}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <p>{patient.patientName}</p>
                </div>
                <div>
                  <span className="font-medium">Patient ID:</span>
                  <p>{patient.patientId}</p>
                </div>
                <div>
                  <span className="font-medium">Department:</span>
                  <p>{patient.department}</p>
                </div>
                <div>
                  <span className="font-medium">Room:</span>
                  <p>{patient.room}</p>
                </div>
                <div>
                  <span className="font-medium">Admission Date:</span>
                  <p>{patient.admissionDate}</p>
                </div>
                <div>
                  <span className="font-medium">Length of Stay:</span>
                  <p>{patient.daysSinceAdmission} days</p>
                </div>
                <div>
                  <span className="font-medium">Attending Doctor:</span>
                  <p>{patient.attendingDoctor}</p>
                </div>
                <div>
                  <span className="font-medium">Current Status:</span>
                  <Badge className="bg-blue-500">{patient.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discharge Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dischargeDate">Discharge Date</Label>
              <Input
                id="dischargeDate"
                type="date"
                value={formData.dischargeDate}
                onChange={(e) => handleInputChange('dischargeDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dischargeTime">Discharge Time</Label>
              <Input
                id="dischargeTime"
                type="time"
                value={formData.dischargeTime}
                onChange={(e) => handleInputChange('dischargeTime', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dischargeType">Discharge Type</Label>
              <Select value={formData.dischargeType} onValueChange={(value) => handleInputChange('dischargeType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select discharge type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine Discharge</SelectItem>
                  <SelectItem value="ama">Against Medical Advice (AMA)</SelectItem>
                  <SelectItem value="transfer">Transfer to Another Facility</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="eloped">Left Without Being Seen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dischargeDestination">Discharge Destination</Label>
              <Select value={formData.dischargeDestination} onValueChange={(value) => handleInputChange('dischargeDestination', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="home-health">Home with Health Services</SelectItem>
                  <SelectItem value="skilled-nursing">Skilled Nursing Facility</SelectItem>
                  <SelectItem value="rehabilitation">Rehabilitation Facility</SelectItem>
                  <SelectItem value="hospice">Hospice Care</SelectItem>
                  <SelectItem value="another-hospital">Another Hospital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dischargingPhysician">Discharging Physician</Label>
            <Select value={formData.dischargingPhysician} onValueChange={(value) => handleInputChange('dischargingPhysician', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select physician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="dr-brown">Dr. Michael Brown</SelectItem>
                <SelectItem value="dr-davis">Dr. Emily Davis</SelectItem>
                <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medical Information */}
          <div>
            <Label htmlFor="finalDiagnosis">Final Diagnosis</Label>
            <Textarea
              id="finalDiagnosis"
              value={formData.finalDiagnosis}
              onChange={(e) => handleInputChange('finalDiagnosis', e.target.value)}
              placeholder="Enter final diagnosis and any secondary diagnoses..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dischargeMedications">Discharge Medications</Label>
            <Textarea
              id="dischargeMedications"
              value={formData.dischargeMedications}
              onChange={(e) => handleInputChange('dischargeMedications', e.target.value)}
              placeholder="List all medications patient should continue at home..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="followUpInstructions">Follow-up Instructions</Label>
            <Textarea
              id="followUpInstructions"
              value={formData.followUpInstructions}
              onChange={(e) => handleInputChange('followUpInstructions', e.target.value)}
              placeholder="Detailed instructions for patient care at home..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="followUpAppointment">Follow-up Appointment</Label>
            <Input
              id="followUpAppointment"
              value={formData.followUpAppointment}
              onChange={(e) => handleInputChange('followUpAppointment', e.target.value)}
              placeholder="Schedule follow-up appointment details..."
            />
          </div>

          {/* Transport Requirements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Transport Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transportRequired"
                  checked={formData.transportRequired}
                  onCheckedChange={(checked) => handleInputChange('transportRequired', checked)}
                />
                <Label htmlFor="transportRequired">Patient requires transport assistance</Label>
              </div>
              {formData.transportRequired && (
                <div>
                  <Label htmlFor="transportType">Transport Type</Label>
                  <Select value={formData.transportType} onValueChange={(value) => handleInputChange('transportType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheelchair">Wheelchair</SelectItem>
                      <SelectItem value="ambulance">Ambulance</SelectItem>
                      <SelectItem value="medical-transport">Medical Transport</SelectItem>
                      <SelectItem value="family-pickup">Family Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Discharge Checklist */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Discharge Checklist</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="patientEducation"
                  checked={formData.patientEducation}
                  onCheckedChange={(checked) => handleInputChange('patientEducation', checked)}
                />
                <Label htmlFor="patientEducation">Patient education completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicationReconciliation"
                  checked={formData.medicationReconciliation}
                  onCheckedChange={(checked) => handleInputChange('medicationReconciliation', checked)}
                />
                <Label htmlFor="medicationReconciliation">Medication reconciliation completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="followUpScheduled"
                  checked={formData.followUpScheduled}
                  onCheckedChange={(checked) => handleInputChange('followUpScheduled', checked)}
                />
                <Label htmlFor="followUpScheduled">Follow-up appointments scheduled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dischargeSummaryProvided"
                  checked={formData.dischargeSummaryProvided}
                  onCheckedChange={(checked) => handleInputChange('dischargeSummaryProvided', checked)}
                />
                <Label htmlFor="dischargeSummaryProvided">Discharge summary provided to patient</Label>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="dischargeNotes">Additional Discharge Notes</Label>
            <Textarea
              id="dischargeNotes"
              value={formData.dischargeNotes}
              onChange={(e) => handleInputChange('dischargeNotes', e.target.value)}
              placeholder="Any additional notes or special instructions..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleDischarge} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!isFormComplete()}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Complete Discharge
            </Button>
          </div>

          {!isFormComplete() && (
            <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded">
              <AlertTriangle className="h-4 w-4" />
              <span>Please complete all required fields and checklist items before discharging the patient.</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}