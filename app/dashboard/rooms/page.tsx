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
import { 
  Building, 
  Bed, 
  User, 
  Search,
  MapPin,
  Settings,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  UserX,
  Eye,
  Edit
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PatientChartModal } from '@/components/patient/patient-chart-modal';
import { RoomDetailsModal } from '@/components/rooms/room-details-modal';
import { AssignPatientModal } from '@/components/rooms/assign-patient-modal';

const floors = [
  {
    id: 'ground',
    name: 'Ground Floor',
    description: 'Emergency, Reception, Pharmacy',
    totalRooms: 12,
    occupiedRooms: 8
  },
  {
    id: 'first',
    name: 'First Floor',
    description: 'General Medicine, Cardiology',
    totalRooms: 24,
    occupiedRooms: 18
  },
  {
    id: 'second',
    name: 'Second Floor',
    description: 'Surgery, ICU, Recovery',
    totalRooms: 20,
    occupiedRooms: 16
  },
  {
    id: 'third',
    name: 'Third Floor',
    description: 'Pediatrics, Maternity',
    totalRooms: 18,
    occupiedRooms: 12
  }
];

const roomsData = {
  ground: [
    { id: 'ER-1', type: 'Emergency', status: 'occupied', patient: { name: 'John Doe', id: 'P001', condition: 'Critical', admissionTime: '10:30 AM' }, beds: 1, department: 'Emergency' },
    { id: 'ER-2', type: 'Emergency', status: 'available', patient: null, beds: 1, department: 'Emergency' },
    { id: 'ER-3', type: 'Emergency', status: 'occupied', patient: { name: 'Sarah Johnson', id: 'P002', condition: 'Stable', admissionTime: '11:15 AM' }, beds: 1, department: 'Emergency' },
    { id: 'ER-4', type: 'Emergency', status: 'maintenance', patient: null, beds: 1, department: 'Emergency' },
    { id: 'PH-1', type: 'Pharmacy', status: 'available', patient: null, beds: 0, department: 'Pharmacy' },
    { id: 'REC-1', type: 'Reception', status: 'available', patient: null, beds: 0, department: 'Reception' }
  ],
  first: [
    { id: 'A-101', type: 'Private', status: 'occupied', patient: { name: 'Michael Brown', id: 'P003', condition: 'Recovering', admissionTime: 'Jan 12' }, beds: 1, department: 'Cardiology' },
    { id: 'A-102', type: 'Private', status: 'available', patient: null, beds: 1, department: 'Cardiology' },
    { id: 'A-103', type: 'Private', status: 'occupied', patient: { name: 'Emily Davis', id: 'P004', condition: 'Stable', admissionTime: 'Jan 13' }, beds: 1, department: 'Cardiology' },
    { id: 'A-201', type: 'Semi-Private', status: 'occupied', patient: { name: 'Robert Wilson', id: 'P005', condition: 'Post-Op', admissionTime: 'Jan 10' }, beds: 2, department: 'General Medicine' },
    { id: 'A-202', type: 'Semi-Private', status: 'partially-occupied', patient: { name: 'Lisa Anderson', id: 'P006', condition: 'Stable', admissionTime: 'Jan 14' }, beds: 2, department: 'General Medicine' },
    { id: 'A-203', type: 'Semi-Private', status: 'available', patient: null, beds: 2, department: 'General Medicine' },
    { id: 'A-301', type: 'Ward', status: 'occupied', patient: { name: 'Multiple Patients', id: 'WARD', condition: 'Various', admissionTime: 'Various' }, beds: 4, department: 'General Medicine' },
    { id: 'A-302', type: 'Ward', status: 'partially-occupied', patient: { name: '2 Patients', id: 'WARD', condition: 'Various', admissionTime: 'Various' }, beds: 4, department: 'General Medicine' }
  ],
  second: [
    { id: 'ICU-1', type: 'ICU', status: 'occupied', patient: { name: 'David Thompson', id: 'P007', condition: 'Critical', admissionTime: 'Jan 15' }, beds: 1, department: 'ICU' },
    { id: 'ICU-2', type: 'ICU', status: 'occupied', patient: { name: 'Maria Rodriguez', id: 'P008', condition: 'Critical', admissionTime: 'Jan 14' }, beds: 1, department: 'ICU' },
    { id: 'ICU-3', type: 'ICU', status: 'available', patient: null, beds: 1, department: 'ICU' },
    { id: 'ICU-4', type: 'ICU', status: 'maintenance', patient: null, beds: 1, department: 'ICU' },
    { id: 'OR-1', type: 'Operating Room', status: 'occupied', patient: { name: 'Surgery in Progress', id: 'SUR', condition: 'Surgery', admissionTime: '2:00 PM' }, beds: 1, department: 'Surgery' },
    { id: 'OR-2', type: 'Operating Room', status: 'available', patient: null, beds: 1, department: 'Surgery' },
    { id: 'REC-1', type: 'Recovery', status: 'occupied', patient: { name: 'James Wilson', id: 'P009', condition: 'Post-Op', admissionTime: '1:30 PM' }, beds: 1, department: 'Surgery' },
    { id: 'REC-2', type: 'Recovery', status: 'available', patient: null, beds: 1, department: 'Surgery' }
  ],
  third: [
    { id: 'PED-1', type: 'Pediatric', status: 'occupied', patient: { name: 'Tommy Smith', id: 'P010', condition: 'Stable', admissionTime: 'Jan 13' }, beds: 1, department: 'Pediatrics' },
    { id: 'PED-2', type: 'Pediatric', status: 'available', patient: null, beds: 1, department: 'Pediatrics' },
    { id: 'MAT-1', type: 'Maternity', status: 'occupied', patient: { name: 'Jennifer Brown', id: 'P011', condition: 'Labor', admissionTime: '6:00 AM' }, beds: 1, department: 'Maternity' },
    { id: 'MAT-2', type: 'Maternity', status: 'available', patient: null, beds: 1, department: 'Maternity' },
    { id: 'NICU-1', type: 'NICU', status: 'occupied', patient: { name: 'Baby Johnson', id: 'P012', condition: 'Monitoring', admissionTime: 'Jan 12' }, beds: 1, department: 'Pediatrics' },
    { id: 'NICU-2', type: 'NICU', status: 'available', patient: null, beds: 1, department: 'Pediatrics' }
  ]
};

const getRoomStatusColor = (status: string) => {
  switch (status) {
    case 'occupied':
      return 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200';
    case 'available':
      return 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200';
    case 'partially-occupied':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200';
    case 'maintenance':
      return 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200';
    case 'cleaning':
      return 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200';
    default:
      return 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'occupied':
      return <Badge variant="destructive">Occupied</Badge>;
    case 'available':
      return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>;
    case 'partially-occupied':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Partial</Badge>;
    case 'maintenance':
      return <Badge variant="secondary">Maintenance</Badge>;
    case 'cleaning':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Cleaning</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getConditionBadge = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'stable':
      return <Badge className="bg-green-500 hover:bg-green-600">Stable</Badge>;
    case 'recovering':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Recovering</Badge>;
    case 'post-op':
      return <Badge className="bg-purple-500 hover:bg-purple-600">Post-Op</Badge>;
    default:
      return <Badge variant="outline">{condition}</Badge>;
  }
};

export default function RoomsPage() {
  const [selectedFloor, setSelectedFloor] = useState('first');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [showPatientChart, setShowPatientChart] = useState(false);
  const [showAssignPatient, setShowAssignPatient] = useState(false);

  const currentFloorRooms = roomsData[selectedFloor as keyof typeof roomsData] || [];
  
  const filteredRooms = currentFloorRooms.filter(room =>
    room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (room.patient && room.patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRoomClick = (room: any) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientChart(true);
  };

  const handleAssignPatient = (room: any) => {
    setSelectedRoom(room);
    setShowAssignPatient(true);
  };

  const totalRooms = Object.values(roomsData).flat().length;
  const occupiedRooms = Object.values(roomsData).flat().filter(room => room.status === 'occupied').length;
  const availableRooms = Object.values(roomsData).flat().filter(room => room.status === 'available').length;
  const maintenanceRooms = Object.values(roomsData).flat().filter(room => room.status === 'maintenance').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Building className="h-8 w-8 mr-3 text-blue-600" />
              Room Management
            </h1>
            <p className="text-gray-600">Monitor room occupancy and manage patient locations</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Room Settings
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
              <p className="text-xs text-muted-foreground">Across all floors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <User className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{occupiedRooms}</div>
              <p className="text-xs text-muted-foreground">{Math.round((occupiedRooms/totalRooms)*100)}% occupancy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableRooms}</div>
              <p className="text-xs text-muted-foreground">Ready for patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{maintenanceRooms}</div>
              <p className="text-xs text-muted-foreground">Under maintenance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="floor-view" className="space-y-6">
          <TabsList>
            <TabsTrigger value="floor-view">Floor View</TabsTrigger>
            <TabsTrigger value="patient-location">Patient Location</TabsTrigger>
            <TabsTrigger value="room-status">Room Status</TabsTrigger>
          </TabsList>

          <TabsContent value="floor-view">
            <div className="space-y-6">
              {/* Floor Selection */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {floors.map((floor) => (
                    <Button
                      key={floor.id}
                      variant={selectedFloor === floor.id ? "default" : "outline"}
                      onClick={() => setSelectedFloor(floor.id)}
                      className="flex flex-col h-auto p-4"
                    >
                      <span className="font-medium">{floor.name}</span>
                      <span className="text-xs text-gray-600">{floor.description}</span>
                      <span className="text-xs">
                        {floor.occupiedRooms}/{floor.totalRooms} occupied
                      </span>
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search rooms or patients..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Room Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {filteredRooms.map((room) => (
                  <Card 
                    key={room.id} 
                    className={`cursor-pointer transition-all duration-200 ${getRoomStatusColor(room.status)}`}
                    onClick={() => handleRoomClick(room)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Bed className="h-5 w-5" />
                      </div>
                      <div className="font-semibold text-lg">{room.id}</div>
                      <div className="text-xs mt-1">{room.type}</div>
                      <div className="text-xs text-gray-600">{room.department}</div>
                      
                      {room.patient && (
                        <div className="mt-2 space-y-1">
                          <div className="text-xs font-medium truncate">{room.patient.name}</div>
                          <div className="text-xs text-gray-600">{room.patient.id}</div>
                          {getConditionBadge(room.patient.condition)}
                        </div>
                      )}
                      
                      <div className="mt-2">
                        {getStatusBadge(room.status)}
                      </div>
                      
                      {room.beds > 1 && (
                        <div className="text-xs mt-1 text-gray-600">
                          {room.beds} beds
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRooms.length === 0 && (
                <div className="text-center py-12">
                  <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No rooms found matching your search</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="patient-location">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Current Patient Locations</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {Object.values(roomsData).flat()
                  .filter(room => room.patient && room.patient.name !== 'Multiple Patients' && room.patient.name !== '2 Patients')
                  .filter(room => 
                    !searchTerm || 
                    room.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    room.patient?.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    room.id.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((room) => (
                    <Card key={`${room.id}-${room.patient?.id}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{room.patient?.name}</h3>
                              <p className="text-sm text-gray-600">ID: {room.patient?.id}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span>Room: {room.id}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <span>{room.department}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span>Since: {room.patient?.admissionTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {getConditionBadge(room.patient?.condition || 'Unknown')}
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewPatient(room.patient)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Chart
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRoomClick(room)}
                              >
                                <MapPin className="h-4 w-4 mr-1" />
                                Room Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="room-status">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {floors.map((floor) => (
                  <Card key={floor.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {floor.name}
                        <Badge variant="outline">
                          {floor.occupiedRooms}/{floor.totalRooms}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{floor.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Available:</span>
                          <span className="font-medium">
                            {roomsData[floor.id as keyof typeof roomsData]?.filter(r => r.status === 'available').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600">Occupied:</span>
                          <span className="font-medium">
                            {roomsData[floor.id as keyof typeof roomsData]?.filter(r => r.status === 'occupied').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600">Partial:</span>
                          <span className="font-medium">
                            {roomsData[floor.id as keyof typeof roomsData]?.filter(r => r.status === 'partially-occupied').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Maintenance:</span>
                          <span className="font-medium">
                            {roomsData[floor.id as keyof typeof roomsData]?.filter(r => r.status === 'maintenance').length || 0}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setSelectedFloor(floor.id)}
                      >
                        View Floor
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Legend */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Status Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                      <span className="text-sm">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                      <span className="text-sm">Partially Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                      <span className="text-sm">Cleaning</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Room Details Modal */}
        <RoomDetailsModal
          isOpen={showRoomDetails}
          onClose={() => setShowRoomDetails(false)}
          room={selectedRoom}
          onAssignPatient={() => {
            setShowRoomDetails(false);
            setShowAssignPatient(true);
          }}
        />

        {/* Patient Chart Modal */}
        <PatientChartModal
          isOpen={showPatientChart}
          onClose={() => setShowPatientChart(false)}
          patient={selectedPatient}
        />

        {/* Assign Patient Modal */}
        <AssignPatientModal
          isOpen={showAssignPatient}
          onClose={() => setShowAssignPatient(false)}
          room={selectedRoom}
          onAssign={(assignmentData) => {
            console.log('Patient assigned:', assignmentData);
            alert(`Patient assigned to room ${assignmentData.roomId}`);
          }}
        />
      </div>
    </DashboardLayout>
  );
}