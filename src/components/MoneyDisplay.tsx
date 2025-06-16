import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface MoneyDisplayProps {
  money: number;
  totalEarned: number;
  incomePerSecond: number;
}

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  money,
  totalEarned,
  incomePerSecond
}) => {
  const formatMoney = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`;
    return `$${Math.floor(amount)}`;
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Vibe Coding Empire</h2>
        <DollarSign className="w-8 h-8" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm opacity-80">Current Balance</p>
          <p className="text-3xl font-bold">{formatMoney(money)}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm opacity-80">Total Earned</p>
          <p className="text-xl font-semibold">{formatMoney(totalEarned)}</p>
        </div>
        
        <div className="text-center flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <div>
            <p className="text-sm opacity-80">Income/sec</p>
            <p className="text-xl font-semibold">{formatMoney(incomePerSecond)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};