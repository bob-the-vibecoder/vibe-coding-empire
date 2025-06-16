import React, { useState } from 'react';
import { Code2, Sparkles } from 'lucide-react';

interface ClickButtonProps {
  onClick: () => void;
  clickPower: number;
}

export const ClickButton: React.FC<ClickButtonProps> = ({ onClick, clickPower }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 150);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Start Vibe Coding!</h3>
      <button
        onClick={handleClick}
        className={`relative group bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                   text-white rounded-full p-8 shadow-2xl transition-all duration-200 transform 
                   ${isClicked ? 'scale-95' : 'hover:scale-105'} 
                   focus:outline-none focus:ring-4 focus:ring-blue-300`}
      >
        <div className="flex items-center justify-center gap-3">
          <Code2 className="w-12 h-12" />
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
        
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 rounded-full px-3 py-1 text-sm font-bold shadow-lg">
          +${clickPower}
        </div>
        
        <div className="mt-2 text-lg font-semibold">
          Generate Vibes
        </div>
      </button>
      
      <p className="mt-3 text-gray-600 text-sm">
        Click to earn money and build your coding empire!
      </p>
    </div>
  );
};