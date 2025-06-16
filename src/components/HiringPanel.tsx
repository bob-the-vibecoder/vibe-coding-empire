import React from 'react';
import { employeeTemplates } from '../data/employees';
import { EmployeeType } from '../types/game';
import { Plus, Users, DollarSign } from 'lucide-react';

interface HiringPanelProps {
  money: number;
  onHire: (template: typeof employeeTemplates[0]) => void;
  getEmployeeCount: (type: EmployeeType) => number;
  getNextEmployeeCost: (template: typeof employeeTemplates[0]) => number;
}

export const HiringPanel: React.FC<HiringPanelProps> = ({
  money,
  onHire,
  getEmployeeCount,
  getNextEmployeeCost
}) => {
  const formatMoney = (amount: number) => {
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-800">Hire Employees</h3>
      </div>

      <div className="space-y-4">
        {employeeTemplates.map((template) => {
          const count = getEmployeeCount(template.type);
          const cost = getNextEmployeeCost(template);
          const canAfford = money >= cost;

          return (
            <div
              key={template.type}
              className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                canAfford ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{template.type}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{template.baseIncome}/sec</span>
                    </div>
                    <div>Owned: {count}</div>
                  </div>
                </div>

                <button
                  onClick={() => onHire(template)}
                  disabled={!canAfford}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    canAfford
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{formatMoney(cost)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};