import React from 'react';
import { Employee } from '../types/game';
import { User, DollarSign } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  workstationIndex: number;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const getEmployeeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'Intern': '👨‍💻',
      'Junior Dev': '💻',
      'Senior Dev': '🚀',
      'Tech Lead': '🏗️',
      'CTO': '👑'
    };
    return icons[type] || '💼';
  };

  const getEmployeeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Intern': 'from-green-400 to-green-600',
      'Junior Dev': 'from-blue-400 to-blue-600',
      'Senior Dev': 'from-purple-400 to-purple-600',
      'Tech Lead': 'from-orange-400 to-orange-600',
      'CTO': 'from-red-400 to-red-600'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className={`bg-gradient-to-br ${getEmployeeColor(employee.type)} rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse-slow`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{getEmployeeIcon(employee.type)}</div>
        <div className="flex items-center gap-1 text-sm bg-white/20 rounded-full px-2 py-1">
          <DollarSign className="w-3 h-3" />
          <span>{employee.income}/s</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h4 className="font-semibold text-sm">{employee.name}</h4>
        <p className="text-xs opacity-90">{employee.type}</p>
      </div>
      
      <div className="mt-2 bg-white/10 rounded-lg p-2">
        <div className="flex items-center gap-2">
          <User className="w-3 h-3" />
          <div className="flex-1 bg-white/20 rounded-full h-1">
            <div className="bg-white rounded-full h-1 w-3/4 animate-pulse"></div>
          </div>
        </div>
        <p className="text-xs mt-1 opacity-75">Vibe coding...</p>
      </div>
    </div>
  );
};