import { EmployeeTemplate, EmployeeType } from '../types/game';

export const employeeTemplates: EmployeeTemplate[] = [
  {
    type: EmployeeType.INTERN,
    baseCost: 20,
    baseIncome: 1,
    description: 'Eager to learn, codes for experience',
    color: 'from-green-400 to-green-600',
    icon: '👨‍💻'
  },
  {
    type: EmployeeType.JUNIOR,
    baseCost: 110,
    baseIncome: 5,
    description: 'Fresh graduate with solid fundamentals',
    color: 'from-blue-400 to-blue-600',
    icon: '💻'
  },
  {
    type: EmployeeType.SENIOR,
    baseCost: 1000,
    baseIncome: 25,
    description: 'Experienced developer, mentors others',
    color: 'from-purple-400 to-purple-600',
    icon: '🚀'
  },
  {
    type: EmployeeType.ARCHITECT,
    baseCost: 5000,
    baseIncome: 100,
    description: 'Designs systems, leads technical decisions',
    color: 'from-orange-400 to-orange-600',
    icon: '🏗️'
  },
  {
    type: EmployeeType.CTO,
    baseCost: 25000,
    baseIncome: 500,
    description: 'Visionary leader, drives company strategy',
    color: 'from-red-400 to-red-600',
    icon: '👑'
  }
];

export const generateEmployeeName = (): string => {
  const names = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sage', 'River', 'Rowan', 'Phoenix', 'Skyler', 'Cameron', 'Drew', 'Blake'
  ];

  const surnames = [
    'Chen', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];

  return `${name} ${surname}`;
};