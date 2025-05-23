import React, { useState, useEffect } from 'react';
import { Dice5 } from 'lucide-react';

interface DiceRollerProps {
  onRoll: (value: number) => void;
  canRoll: boolean;
  cooldownTime: number;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll, canRoll, cooldownTime }) => {
  const [rolling, setRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: number;
    
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleRollClick = () => {
    if (!canRoll || rolling) return;
    
    setRolling(true);
    
    // Animate dice roll
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setRolling(false);
        onRoll(finalValue);
        setCountdown(cooldownTime);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-24 h-24 bg-white rounded-xl border-2 border-gray-300 flex items-center justify-center shadow-md mb-4 cursor-pointer transition-all ${
          rolling ? 'animate-bounce' : ''
        } ${canRoll && !rolling ? 'hover:shadow-lg hover:scale-105' : 'opacity-80'}`}
        onClick={handleRollClick}
      >
        {rolling ? (
          <div className="animate-spin">
            <Dice5 className="h-12 w-12 text-indigo-600" />
          </div>
        ) : (
          <div className="text-4xl font-bold text-indigo-600">{diceValue}</div>
        )}
      </div>
      
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          canRoll && !rolling
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleRollClick}
        disabled={!canRoll || rolling}
      >
        {rolling ? 'Rolling...' : canRoll ? 'Roll Dice' : `Wait ${countdown}s`}
      </button>
    </div>
  );
};

export default DiceRoller;