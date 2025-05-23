import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { Cell as CellType, CellType as CellTypeEnum } from '../types/game.types';
import { calculateBoardPath } from '../utils/board.utils';

interface BoardProps {
  cells: CellType[];
  playerPosition: number;
  onResize: (width: number, height: number) => void;
}

const Board: React.FC<BoardProps> = ({ cells, playerPosition, onResize }) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [cellSize, setCellSize] = useState(40);
  const boardRef = useRef<HTMLDivElement>(null);

  // Recalculate board layout on resize
  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const width = boardRef.current.clientWidth;
        const height = boardRef.current.clientHeight;
        
        // Update cell size based on container dimensions
        const newCellSize = Math.min(width, height) * 0.075;
        setCellSize(newCellSize);
        
        // Calculate positions for each cell
        const newPositions = calculateBoardPath(cells.length, width, height);
        setPositions(newPositions);
        
        // Pass dimensions to parent
        onResize(width, height);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cells.length, onResize]);

  return (
    <div 
      ref={boardRef}
      className="relative w-full h-full bg-gray-50 rounded-xl shadow-inner overflow-hidden"
    >
      {/* Board title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-xl font-bold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm">
          Energy Quest
        </h2>
      </div>
      
      {/* Render cells */}
      {cells.map((cell, index) => (
        positions[index] && (
          <Cell
            key={cell.id}
            cell={cell}
            position={positions[index]}
            isPlayerPosition={playerPosition === index}
            size={cellSize}
          />
        )
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold mb-2">Cell Types:</h3>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            <span>Empty (⬜)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-400 rounded mr-2"></div>
            <span>Event (🟪)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
            <span>Bonus (🟦)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-300 rounded mr-2"></div>
            <span>Action (🟨)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
            <span>Risk (🟥)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;