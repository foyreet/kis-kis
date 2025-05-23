import React from 'react';
import { User, AlertCircle } from 'lucide-react';
import Avatar from './Avatar';
import DiceRoller from './DiceRoller';
import { Player } from '../types/game.types';

interface PlayerPanelProps {
  player: Player;
  message: string;
  onRollDice: (value: number) => void;
  onAvatarChange: (index: number) => void;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ 
  player, 
  message, 
  onRollDice,
  onAvatarChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Player Dashboard</h2>
        <div className="p-2 bg-indigo-100 rounded-full">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">Level:</span>
          <span className="text-lg font-bold text-indigo-600">{player.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all"
            style={{ width: `${Math.min(100, (player.level % 2) * 50)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {player.level % 2 === 0 ? 'Level complete!' : `${2 - (player.level % 2)} more to level up`}
        </p>
      </div>
      
      <Avatar 
        level={player.level} 
        avatarIndex={player.avatarIndex} 
        onAvatarChange={onAvatarChange} 
      />
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Position</h3>
        <p className="text-gray-700">Cell: {player.position + 1}/50</p>
      </div>
      
      <DiceRoller 
        onRoll={onRollDice} 
        canRoll={player.canRoll} 
        cooldownTime={5}
      />
      
      {message && (
        <div className="mt-6 p-3 bg-indigo-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerPanel;