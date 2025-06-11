'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Bed, 
  User, 
  MapPin, 
  Clock, 
  Settings, 
  UserPlus,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Wifi,
  Tv,
  Phone
} from 'lucide-react';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
  onAssignPatient: () => void;
}

export function RoomDetailsModal({ isOpen, onClose, room, onAssignPatient }: RoomDetailsModalProps) {
  const [newStatus, setNewStatus] = useState('');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  if (!room) return null;

  const roomAmenities = [
    { name: 'Air Conditioning', icon: Thermometer, available: true },
    { name: 'WiFi', icon: Wifi, available: true },
    { name: 'Television', icon: Tv, available: room.type !== 'Emergency' },
    { name: 'Phone', icon: Phone, available: room.type === 'Private' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'text-red-600 bg-red-50';
      case 'available': return 'text-green-600 bg-green-50';
      case 'partially-occupied': return 'text-yellow-600 bg-yellow-50';
      case 'maintenance': return 'text-gray-600 bg-gray-50';
      case 'cleaning': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleStatusChange = () => {
    if (newStatus) {
      console.log('Changing room status to:', newStatus);
      alert(`Room ${room.id} status changed to ${newStatus}`);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bed className="h-5 w-5" />
            <span>Room {room.id} Details</span>
          </DialogTitle>
          <DialogDescription>
            Detailed information and management for {room.type} room
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Room Information</span>
                <Badge className={getStatusColor(room.status)}>
                  {room.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Room ID:</span>
                  <p className="text-gray-600">{room.id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Room Type:</span>
                  <p className="text-gray-600">{room.type}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Department:</span>
                  <p className="text-gray-600">{room.department}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Bed Capacity:</span>
                  <p className="text-gray-600">{room.beds} bed(s)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Patient */}
          {room.patient && room.patient.name !== 'Multiple Patients' && room.patient.name !== '2 Patients' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Current Patient</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">{room.patient.name}</h4>
                    <p className="text-sm text-gray-600">Patient ID: {room.patient.id}</p>
                    <p className="text-sm text-gray-600">Condition: {room.patient.condition}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Admitted: {room.patient.admissionTime}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Patient Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Room Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Room Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {roomAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <amenity.icon className={`h-4 w-4 ${amenity.available ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${amenity.available ? 'text-gray-700' : 'text-gray-400'}`}>
                      {amenity.name}
                    </span>
                    {amenity.available ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Room Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Room Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Change Room Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newStatus === 'maintenance' || room.status === 'maintenance') && (
                <div>
                  <Label htmlFor="maintenanceNotes">Maintenance Notes</Label>
                  <Textarea
                    id="maintenanceNotes"
                    value={maintenanceNotes}
                    onChange={(e) => setMaintenanceNotes(e.target.value)}
                    placeholder="Describe maintenance issues or work needed..."
                    rows={3}
                  />
                </div>
              )}

              <div className="flex space-x-2">
                {newStatus && (
                  <Button onClick={handleStatusChange} className="bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-1" />
                    Update Status
                  </Button>
                )}
                
                {(room.status === 'available' || room.status === 'partially-occupied') && (
                  <Button onClick={onAssignPatient} className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Assign Patient
                  </Button>
                )}

                {room.status === 'maintenance' && (
                  <Button variant="outline">
                    <Wrench className="h-4 w-4 mr-1" />
                    Schedule Maintenance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Room cleaned and sanitized</span>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Patient admitted</span>
                  <span className="text-gray-500">1 day ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Maintenance completed</span>
                  <span className="text-gray-500">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}