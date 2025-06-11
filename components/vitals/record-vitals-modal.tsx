'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Thermometer, 
  Heart, 
  Activity, 
  Wind,
  Droplets
} from 'lucide-react';

interface RecordVitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: any[];
  onSave: (vitalsData: any) => void;
}

export function RecordVitalsModal({ isOpen, onClose, patients, onSave }: RecordVitalsModalProps) {
  const [formData, setFormData] = useState({
    patientId: '',
    temperature: '',
    temperatureUnit: 'F',
    systolic: '',
    diastolic: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    pain: '',
    weight: '',
    height: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const vitalsData = {
      ...formData,
      timestamp: new Date().toISOString(),
      recordedBy: 'Current User' // In real app, get from auth context
    };
    onSave(vitalsData);
    setFormData({
      patientId: '',
      temperature: '',
      temperatureUnit: 'F',
      systolic: '',
      diastolic: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      pain: '',
      weight: '',
      height: '',
      notes: ''
    });
    onClose();
  };

  const selectedPatient = patients.find(p => p.id === formData.patientId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Record Vital Signs</span>
          </DialogTitle>
          <DialogDescription>
            Enter patient vital signs and observations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Selection */}
          <div>
            <Label htmlFor="patient">Select Patient</Label>
            <Select value={formData.patientId} onValueChange={(value) => handleInputChange('patientId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - Room {patient.room || 'N/A'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPatient && (
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium">{selectedPatient.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedPatient.age}y {selectedPatient.gender} • Room: {selectedPatient.room || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vital Signs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span>Temperature</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="98.6"
                    className="flex-1"
                  />
                  <Select value={formData.temperatureUnit} onValueChange={(value) => handleInputChange('temperatureUnit', value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="F">°F</SelectItem>
                      <SelectItem value="C">°C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Blood Pressure */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span>Blood Pressure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2 items-center">
                  <Input
                    type="number"
                    value={formData.systolic}
                    onChange={(e) => handleInputChange('systolic', e.target.value)}
                    placeholder="120"
                    className="flex-1"
                  />
                  <span className="text-gray-500">/</span>
                  <Input
                    type="number"
                    value={formData.diastolic}
                    onChange={(e) => handleInputChange('diastolic', e.target.value)}
                    placeholder="80"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">mmHg</span>
                </div>
              </CardContent>
            </Card>

            {/* Heart Rate */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Heart Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2 items-center">
                  <Input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e.target.value)}
                    placeholder="75"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">bpm</span>
                </div>
              </CardContent>
            </Card>

            {/* Respiratory Rate */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span>Respiratory Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2 items-center">
                  <Input
                    type="number"
                    value={formData.respiratoryRate}
                    onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                    placeholder="16"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">/min</span>
                </div>
              </CardContent>
            </Card>

            {/* Oxygen Saturation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>Oxygen Saturation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2 items-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.oxygenSaturation}
                    onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                    placeholder="98"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </CardContent>
            </Card>

            {/* Pain Scale */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pain Scale (0-10)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={formData.pain} onValueChange={(value) => handleInputChange('pain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pain level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 - No Pain</SelectItem>
                    <SelectItem value="1">1 - Minimal</SelectItem>
                    <SelectItem value="2">2 - Mild</SelectItem>
                    <SelectItem value="3">3 - Uncomfortable</SelectItem>
                    <SelectItem value="4">4 - Moderate</SelectItem>
                    <SelectItem value="5">5 - Moderate</SelectItem>
                    <SelectItem value="6">6 - Moderately Severe</SelectItem>
                    <SelectItem value="7">7 - Severe</SelectItem>
                    <SelectItem value="8">8 - Very Severe</SelectItem>
                    <SelectItem value="9">9 - Nearly Unbearable</SelectItem>
                    <SelectItem value="10">10 - Unbearable</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Additional Measurements */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="70.5"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="175"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional observations or notes..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!formData.patientId}
            >
              Record Vitals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}