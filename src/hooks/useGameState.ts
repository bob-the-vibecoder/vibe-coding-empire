import { useState, useEffect, useCallback } from 'react';
import { GameState, Employee, EmployeeType } from '../types/game';
import { employeeTemplates, generateEmployeeName } from '../data/employees';

const SAVE_KEY = 'vibe-coding-empire-save';
const SAVE_INTERVAL = 5000; // Save every 5 seconds
const INCOME_INTERVAL = 1000; // Generate income every second

const initialGameState: GameState = {
  money: 100,
  totalEarned: 0,
  clickPower: 1,
  employees: [],
  workstations: 12,
  lastSave: Date.now()
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      // Calculate offline earnings
      const timeAway = Date.now() - parsedState.lastSave;
      const offlineHours = Math.min(timeAway / (1000 * 60 * 60), 8); // Max 8 hours
      const offlineIncome = calculateTotalIncome(parsedState.employees) * offlineHours * 3600;

      return {
        ...parsedState,
        money: parsedState.money + offlineIncome,
        totalEarned: parsedState.totalEarned + offlineIncome,
        lastSave: Date.now()
      };
    }
    return initialGameState;
  });

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        ...gameState,
        lastSave: Date.now()
      }));
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState]);

  // Income generation
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const income = calculateTotalIncome(prev.employees);
        if (income > 0) {
          return {
            ...prev,
            money: prev.money + income,
            totalEarned: prev.totalEarned + income
          };
        }
        return prev;
      });
    }, INCOME_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      money: prev.money + prev.clickPower,
      totalEarned: prev.totalEarned + prev.clickPower
    }));
  }, []);

  const hireEmployee = useCallback((template: typeof employeeTemplates[0]) => {
    setGameState(prev => {
      const employeeCount = prev.employees.filter(emp => emp.type === template.type).length;
      const cost = calculateEmployeeCost(template.baseCost, employeeCount);

      if (prev.money < cost) return prev;

      const availableWorkstation = findAvailableWorkstation(prev.employees, prev.workstations);
      if (availableWorkstation === -1) return prev;

      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: generateEmployeeName(template.type),
        type: template.type,
        income: template.baseIncome,
        cost,
        hired: true,
        workstation: availableWorkstation
      };

      return {
        ...prev,
        money: prev.money - cost,
        employees: [...prev.employees, newEmployee]
      };
    });
  }, []);

  const getEmployeeCount = useCallback((type: EmployeeType) => {
    return gameState.employees.filter(emp => emp.type === type).length;
  }, [gameState.employees]);

  const getNextEmployeeCost = useCallback((template: typeof employeeTemplates[0]) => {
    const employeeCount = getEmployeeCount(template.type);
    return calculateEmployeeCost(template.baseCost, employeeCount);
  }, [getEmployeeCount]);

  return {
    gameState,
    handleClick,
    hireEmployee,
    getEmployeeCount,
    getNextEmployeeCost
  };
};

function calculateTotalIncome(employees: Employee[]): number {
  return employees.reduce((total, emp) => total + emp.income, 0);
}

function calculateEmployeeCost(baseCost: number, count: number): number {
  return Math.floor(baseCost * Math.pow(1.15, count));
}

function findAvailableWorkstation(employees: Employee[], totalWorkstations: number): number {
  const occupiedStations = new Set(employees.map(emp => emp.workstation));
  console.log({ occupiedStations})
  for (let i = 0; i < totalWorkstations; i++) {
    if (!occupiedStations.has(i)) {
      return i;
    }
  }
  return -1;
}