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
import { Progress } from '@/components/ui/progress';
import { 
  Pill, 
  Plus,
  Search,
  AlertTriangle,
  Package,
  ShoppingCart,
  CheckCircle,
  Clock
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const medications = [
  {
    id: 'MED001',
    name: 'Paracetamol 500mg',
    category: 'Analgesic',
    stock: 150,
    minStock: 50,
    maxStock: 500,
    price: 2.50,
    supplier: 'PharmaCorp',
    expiryDate: '2025-06-15',
    batchNumber: 'PC2024001'
  },
  {
    id: 'MED002',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    stock: 25,
    minStock: 30,
    maxStock: 200,
    price: 8.75,
    supplier: 'MediSupply',
    expiryDate: '2024-12-20',
    batchNumber: 'MS2024015'
  },
  {
    id: 'MED003',
    name: 'Metformin 500mg',
    category: 'Antidiabetic',
    stock: 200,
    minStock: 100,
    maxStock: 400,
    price: 5.25,
    supplier: 'HealthPlus',
    expiryDate: '2025-08-30',
    batchNumber: 'HP2024008'
  },
  {
    id: 'MED004',
    name: 'Lisinopril 10mg',
    category: 'ACE Inhibitor',
    stock: 80,
    minStock: 50,
    maxStock: 300,
    price: 12.00,
    supplier: 'PharmaCorp',
    expiryDate: '2025-03-10',
    batchNumber: 'PC2024012'
  }
];

const prescriptions = [
  {
    id: 'RX001',
    patientName: 'John Doe',
    patientId: 'P001',
    doctorName: 'Dr. Sarah Johnson',
    medications: [
      { name: 'Paracetamol 500mg', quantity: 20, instructions: 'Take 1 tablet twice daily' },
      { name: 'Amoxicillin 250mg', quantity: 14, instructions: 'Take 1 capsule three times daily' }
    ],
    status: 'pending',
    dateIssued: '2024-01-15',
    priority: 'normal'
  },
  {
    id: 'RX002',
    patientName: 'Alice Smith',
    patientId: 'P002',
    doctorName: 'Dr. Michael Brown',
    medications: [
      { name: 'Metformin 500mg', quantity: 30, instructions: 'Take 1 tablet with meals' }
    ],
    status: 'dispensed',
    dateIssued: '2024-01-15',
    priority: 'normal'
  },
  {
    id: 'RX003',
    patientName: 'Bob Johnson',
    patientId: 'P003',
    doctorName: 'Dr. Emily Davis',
    medications: [
      { name: 'Lisinopril 10mg', quantity: 30, instructions: 'Take 1 tablet daily in morning' }
    ],
    status: 'ready',
    dateIssued: '2024-01-15',
    priority: 'urgent'
  }
];

const getStockLevel = (current: number, min: number, max: number) => {
  const percentage = (current / max) * 100;
  if (current <= min) return { level: 'low', color: 'red', percentage };
  if (percentage < 50) return { level: 'medium', color: 'yellow', percentage };
  return { level: 'good', color: 'green', percentage };
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'ready':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Ready</Badge>;
    case 'dispensed':
      return <Badge className="bg-green-500 hover:bg-green-600">Dispensed</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = medications.filter(med => med.stock <= med.minStock);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
              <Pill className="h-8 w-8 mr-3 text-green-600" />
              Pharmacy Management
            </h1>
            <p className="text-gray-600">Manage medications, prescriptions, and inventory</p>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Stock</DialogTitle>
                  <DialogDescription>Add new medication or restock existing items</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medication">Medication</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication" />
                      </SelectTrigger>
                      <SelectContent>
                        {medications.map(med => (
                          <SelectItem key={med.id} value={med.id}>{med.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="100" />
                    </div>
                    <div>
                      <Label htmlFor="batch">Batch Number</Label>
                      <Input id="batch" placeholder="BT2024001" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input id="supplier" placeholder="Supplier name" />
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Add to Inventory</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              New Medication
            </Button>
          </div>
        </div>

        {/* Alert for low stock */}
        {lowStockItems.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  {lowStockItems.length} medication(s) running low on stock
                </span>
                <Button variant="outline" size="sm" className="ml-auto">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search medications..."
                    className="pl-10 w-72"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredMedications.length} medications found
                </div>
              </div>

              <div className="grid gap-4">
                {filteredMedications.map((medication) => {
                  const stockInfo = getStockLevel(medication.stock, medication.minStock, medication.maxStock);
                  return (
                    <Card key={medication.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                              <Badge variant="secondary">{medication.category}</Badge>
                              {medication.stock <= medication.minStock && (
                                <Badge variant="destructive">Low Stock</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">ID: {medication.id}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Stock Level:</span>
                                <p className="text-gray-600">{medication.stock} units</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Price:</span>
                                <p className="text-gray-600">${medication.price}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Supplier:</span>
                                <p className="text-gray-600">{medication.supplier}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Expiry:</span>
                                <p className="text-gray-600">{medication.expiryDate}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2 ml-6">
                            <div className="w-32">
                              <div className="text-xs text-gray-600 mb-1">Stock Level</div>
                              <Progress 
                                value={stockInfo.percentage} 
                                className="h-2"
                              />
                              <div className="text-xs text-gray-600 mt-1">
                                {medication.stock}/{medication.maxStock}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-1" />
                            Restock
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Today's Prescriptions</h3>
                <div className="text-sm text-gray-600">
                  {prescriptions.length} prescriptions
                </div>
              </div>

              <div className="grid gap-4">
                {prescriptions.map((prescription) => (
                  <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{prescription.patientName}</h3>
                            {getStatusBadge(prescription.status)}
                            {prescription.priority === 'urgent' && (
                              <Badge variant="destructive">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            ID: {prescription.patientId} • Doctor: {prescription.doctorName}
                          </p>
                          
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">Medications:</h4>
                            <div className="space-y-2">
                              {prescription.medications.map((med, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium text-sm">{med.name}</p>
                                      <p className="text-xs text-gray-600">{med.instructions}</p>
                                    </div>
                                    <span className="text-sm font-medium">Qty: {med.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2 ml-6">
                          <p className="text-sm text-gray-600">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {prescription.dateIssued}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        {prescription.status === 'pending' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Prepare
                          </Button>
                        )}
                        {prescription.status === 'ready' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Dispense
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

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Manage supplier orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No active orders</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}