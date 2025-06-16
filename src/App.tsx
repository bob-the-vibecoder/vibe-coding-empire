// import React from 'react';
import { useGameState } from './hooks/useGameState';
import { MoneyDisplay } from './components/MoneyDisplay';
import { ClickButton } from './components/ClickButton';
import { Office } from './components/Office';
import { HiringPanel } from './components/HiringPanel';

function App() {
  const {
    gameState,
    handleClick,
    hireEmployee,
    getEmployeeCount,
    getNextEmployeeCost
  } = useGameState();

  const incomePerSecond = gameState.employees.reduce((total, emp) => total + emp.income, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <MoneyDisplay
          money={gameState.money}
          totalEarned={gameState.totalEarned}
          incomePerSecond={incomePerSecond}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Click Button */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl h-fit">
              <ClickButton
                onClick={handleClick}
                clickPower={gameState.clickPower}
              />
            </div>
          </div>

          {/* Right Column - Office */}
          <div className="lg:col-span-2">
            <Office
              employees={gameState.employees}
              workstations={gameState.workstations}
            />
          </div>
        </div>

        {/* Hiring Panel */}
        <HiringPanel
          money={gameState.money}
          onHire={hireEmployee}
          getEmployeeCount={getEmployeeCount}
          getNextEmployeeCost={getNextEmployeeCost}
        />

        {/* Footer */}
        <div className="text-center text-gray-600 py-4">
          <p className="text-sm">
            Build your Vibe Coding empire and convince everyone in the world that vibe coding is the future! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;