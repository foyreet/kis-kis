import React from 'react';
import { Cell as CellType, CellType as CellTypeEnum } from '../types/game.types';

interface CellProps {
  cell: CellType;
  position: { x: number; y: number };
  isPlayerPosition: boolean;
  size: number;
}

const Cell: React.FC<CellProps> = ({ cell, position, isPlayerPosition, size }) => {
  // Cell colors based on type
  const getColor = () => {
    switch (cell.type) {
      case CellTypeEnum.EMPTY:
        return 'bg-gray-200';
      case CellTypeEnum.EVENT:
        return 'bg-purple-400';
      case CellTypeEnum.BONUS:
        return 'bg-blue-400';
      case CellTypeEnum.ACTION:
        return 'bg-yellow-300';
      case CellTypeEnum.RISK:
        return 'bg-red-400';
      default:
        return 'bg-gray-200';
    }
  };

  // Cell symbol based on type
  const getCellSymbol = () => {
    switch (cell.type) {
      case CellTypeEnum.EMPTY:
        return '⬜';
      case CellTypeEnum.EVENT:
        return '🟪';
      case CellTypeEnum.BONUS:
        return '🟦';
      case CellTypeEnum.ACTION:
        return '🟨';
      case CellTypeEnum.RISK:
        return '🟥';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`absolute rounded-md flex items-center justify-center ${getColor()} ${
        isPlayerPosition ? 'ring-4 ring-green-500 z-10' : ''
      }`}
      style={{
        left: position.x - size/2,
        top: position.y - size/2,
        width: size,
        height: size,
        transition: 'background-color 0.3s ease',
      }}
    >
      <span className="text-sm">{getCellSymbol()}</span>
      <span className="absolute -top-6 text-xs font-semibold">{cell.id + 1}</span>
    </div>
  );
};

export default Cell;