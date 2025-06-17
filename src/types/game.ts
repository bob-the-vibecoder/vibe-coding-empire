export interface Employee {
  id: string;
  name: string;
  type: EmployeeType;
  income: number;
  cost: number;
  hired: boolean;
  workstation?: number;
}

export interface GameState {
  money: number;
  totalEarned: number;
  clickPower: number;
  employees: Employee[];
  workstations: number;
  lastSave: number;
}

export enum EmployeeType {
  INTERN = 'Intern',
  JUNIOR = 'Junior Dev',
  SENIOR = 'Senior Dev',
  ARCHITECT = 'Tech Lead',
  CTO = 'CTO',
  ADVANCED = 'Advanced AI Lead'
}

export interface EmployeeTemplate {
  type: EmployeeType;
  baseCost: number;
  baseIncome: number;
  description: string;
  color: string;
  icon: string;
}