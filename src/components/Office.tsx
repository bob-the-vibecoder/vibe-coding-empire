import React from 'react';
import { Employee } from '../types/game';
import { EmployeeCard } from './EmployeeCard';
import { Monitor, Coffee, Wifi } from 'lucide-react';

interface OfficeProps {
  employees: Employee[];
  workstations: number;
}

export const Office: React.FC<OfficeProps> = ({ employees, workstations }) => {
  const renderWorkstation = (index: number) => {
    const employee = employees.find(emp => emp.workstation === index);

    if (employee) {
      return <EmployeeCard key={employee.id} employee={employee} workstationIndex={index} />;
    }

    return (
      <div key={index} className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors">
        <Monitor className="w-8 h-8 mb-2" />
        <p className="text-sm font-medium">Empty Desk</p>
        <p className="text-xs">Hire someone!</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      {/* Upper Part of Office */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Your Office</h3>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Free Coffee</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Fiber Internet</span>
          </div>
        </div>
      </div>

     {/* The Desks */}
      <div className="max-h-[300px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: workstations }, (_, index) => renderWorkstation(index))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">
          {employees.length} / {workstations} desks occupied
        </p>
      </div>
    </div>
  );
};
